import { Injectable } from '@nimble-ts/core/inject';
import { FireBaseService } from './firebase.service';
import { AuthUser } from './models/auth-user.model';
import firebase, { User } from 'firebase/app';
import 'firebase/auth';

@Injectable({ single: true })
export class FirebaseAuthService {

	private AUTH_KEY_STORAGE = 'user_auth';

	private get auth() { return this.firebaseService.app.auth(); }

	public get user() {
		const jsonStr = localStorage.getItem(this.AUTH_KEY_STORAGE);
		if (jsonStr) {
			return new AuthUser(JSON.parse(atob(jsonStr)));
		}
		return null;
	}

	public get isLogged(){ return localStorage.getItem(this.AUTH_KEY_STORAGE) != null; }

	public get adminIsLogged() {
		let user = this.user;
		return !!(user && user.isAdmin);
	}

    constructor(
		private firebaseService: FireBaseService
	) {
	}

    public async doGoogleAuth() {
		await this.doAuthByProvider(new firebase.auth.GoogleAuthProvider());
	}

    public async doFacebookAuth() {
		await this.doAuthByProvider(new firebase.auth.FacebookAuthProvider());
	}

    public async doGithubAuth() {
		await this.doAuthByProvider(new firebase.auth.GithubAuthProvider());
	}
	
	public async doAuth(email: string, pass: string): Promise<void> {
		await this.auth.signOut();
		const result = await this.auth.signInWithEmailAndPassword(email, pass);
		await this.setAuthenticatedUser(result.user, result.credential?.providerId ?? 'email');
	}
	
	private async doAuthByProvider(provider: firebase.auth.AuthProvider): Promise<void> {
		await this.auth.signOut();
		const result = await this.auth.signInWithPopup(provider);
		await this.setAuthenticatedUser(result.user, result.credential?.providerId ?? 'email');
	}

	public async doLogout() {
		await this.auth.signOut();
		this.removeAuthenticatedUser();
	}

	private async setAuthenticatedUser(authUser: User, prodiverId: string = 'email') {
		const firebaseUser = Object.assign({}, authUser);

		if (prodiverId === 'email') {
			const snapshot = await this.firebaseService.app.firestore()
				.collection('user-data')
				.where('email', '==', firebaseUser.email)
				.limit(1)
				.get();
			
			if (snapshot.docs.length > 0) {
				const data = snapshot.docs[0].data();
				firebaseUser.displayName = data.name;
				firebaseUser.photoURL = data.photoURL;
			}
		}

		const user = new AuthUser({
			displayName: firebaseUser.displayName ?? '',
			email: firebaseUser.email,
			photoURL: firebaseUser.photoURL ?? '',
			providerId: prodiverId,
			isAdmin: prodiverId === 'email',
			
		});
		localStorage.setItem(this.AUTH_KEY_STORAGE, btoa(JSON.stringify(user)));
	}

	private removeAuthenticatedUser() {
		localStorage.removeItem(this.AUTH_KEY_STORAGE);
	}
}