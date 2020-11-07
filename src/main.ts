import { enviroment, NimbleApp } from '@nimble-ts/core';
import '@nimble-ts/core/plugins/google-analytics';
import { ROUTES } from './app/routes';
import { ArticleService } from './app/services/article.service';
import { FireBaseService } from './app/services/firebase.service';
import { FirebaseAuthService } from './app/services/firebase-auth.service';
import { HelperService } from './app/services/helper.service';

NimbleApp.config({
    routes: ROUTES,
    directives: [],
    providers: [
		HelperService,
		FireBaseService,
		FirebaseAuthService,
		ArticleService,
	]
}).pluginGoogleAnalytics({
	id: 'UA-137851769-1',
	disabled: !enviroment.production
})
.start();