export class AuthUser {
	displayName: string;
	email: string;
	photoURL: string;
	providerId: string;
	isAdmin: boolean = false;

	constructor(obj: Partial<AuthUser>) {
		Object.assign(this, obj);
	}
}