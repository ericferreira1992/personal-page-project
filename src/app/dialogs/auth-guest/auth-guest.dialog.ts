import { Dialog, PrepareDialog, DIALOG_REF, DialogRef } from '@nimble-ts/core/dialog';
import { Inject } from '@nimble-ts/core/inject';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

@PrepareDialog({
    template: require('./auth-guest.dialog.html'),
    style: require('./auth-guest.dialog.scss')
})
export class AuthGuestDialog extends Dialog {

	public loading: boolean = false;
	public errorMsg: string = '';

    constructor(
		@Inject(DIALOG_REF) public dialogRef: DialogRef<AuthGuestDialog>,
		private authService: FirebaseAuthService
    ) {
        super();
    }

	public async doAuth(authType: string) {
		if (!this.loading) {
			this.render(() => this.loading = true);
			try {
				switch(authType) {
					case 'goo': {
						await this.authService.doGoogleAuth();
						this.dialogRef.close(true);
						break;
					}
					case 'fb': {
						await this.authService.doFacebookAuth();
						this.dialogRef.close(true);
						break;
					}
					case 'gh': {
						await this.authService.doGithubAuth();
						this.dialogRef.close(true);
						break;
					}
				}
			}
			catch(e) {
				this.render(() => {
					this.loading = false
					this.errorMsg = e.message;
					console.error(e);
				});
			}
		}
	}
}