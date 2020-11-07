import { Dialog, PrepareDialog, DIALOG_REF, DialogRef } from '@nimble-ts/core/dialog';
import { Form, Validators } from '@nimble-ts/core/forms';
import { Inject } from '@nimble-ts/core/inject';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

@PrepareDialog({
    template: require('./auth-admin.dialog.html'),
    style: require('./auth-admin.dialog.scss')
})
export class AuthAdminDialog extends Dialog {

	public loading: boolean = false;
	public errorMsg: string = '';
	public form = new Form({
		email: { value: '', validators: [Validators.required, Validators.email] },
		password: { value: '', validators: [Validators.required] }
	});

    constructor(
		@Inject(DIALOG_REF) public dialogRef: DialogRef<AuthAdminDialog>,
		private authService: FirebaseAuthService
    ) {
        super();
    }

    onOpen() {
		this.form.get('email').elements[0].focus();
	}
	
	public async onSubmit(){
		if (this.form.isValid && !this.loading) {
			try {
				this.render(() => this.loading = true);
				const email = this.form.get('email').value;
				const password = this.form.get('password').value;
				await this.authService.doAuth(email, password);
				this.dialogRef.close(true);
			}
			catch(e) {
				this.errorMsg = e.message;
				this.render(() => this.loading = false);
			}
		}
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

    onClose() {
    }
}