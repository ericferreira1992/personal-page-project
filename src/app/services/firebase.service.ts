import { Injectable } from '@nimble-ts/core/inject';
import firebase from 'firebase/app';
import 'firebase/firestore';

export const Timestamp = firebase.firestore.Timestamp;

@Injectable({ single: true })
export class FireBaseService {

	private _app: firebase.app.App = null;
	public get app() { return this._app; }

    constructor() {
		this._app = firebase.initializeApp({
			apiKey: "AIzaSyDyTRoin6xxsuTHaDyS8uiGejjKK1C6bsM",
			authDomain: "personal-page-cf5c6.firebaseapp.com",
			databaseURL: "https://personal-page-cf5c6.firebaseio.com",
			projectId: "personal-page-cf5c6",
			storageBucket: "personal-page-cf5c6.appspot.com",
			messagingSenderId: "529543325792",
			appId: "1:529543325792:web:bda4cb13df138463417b05"
		});
	}
}