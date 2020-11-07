import { DialogBuilder } from '@nimble-ts/core/dialog';
import { Page, PreparePage } from '@nimble-ts/core/page';
import { Router } from '@nimble-ts/core/route';
import { AuthAdminDialog } from 'src/app/dialogs/auth-admin/auth-admin.dialog';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';

@PreparePage({
    template: require('./public.page.html'),
    style: require('./public.page.scss'),
})
export class PublicPage extends Page {
    public menu = {
		items: [
			{ text: 'Blog', path: 'blog' },
			{ text: 'Sobre mim', path: 'about-me' },
			{ text: 'Open Sources', path: 'open-sources' },
			{ text: 'Habilitades', path: 'skills' },
			{ text: 'Contato', path: 'contact' },
		]
	};

	public socialMediaItems = [
		{ name: 'Linked In', url: 'https://www.linkedin.com/in/eric-andrade-ferreira-36565575/', imgName: 'linkedin' },
		{ name: 'Email', url: 'mailto:ericferreira1992@gmail.com', imgName: 'email' },
		{ name: 'Github', url: 'https://github.com/ericferreira1992', imgName: 'github' },
		{ name: 'Medium', url: 'https://medium.com/@ericandrade_24404', imgName: 'medium' }
	];

	private signing: boolean = false;
	private signouting: boolean = false;
	private menuExpanded: boolean = false;
	
    public get routePath() { return Router.currentPath; }
    public get isLogged() { return this.authService.isLogged; }

    constructor(
		private authService: FirebaseAuthService,
		private dialogBuilder: DialogBuilder
	) {
        super();
	}
	
	public async login() {
		if (!this.isLogged) {
			this.render(() => this.signing = true);
			this.dialogBuilder.open(AuthAdminDialog, {
				width: '100%',
				maxWidth: '350px'
			}).onClose.then(() => {
				this.render(() => this.signing = false);
			});
		}
	}
	
	public logout() {
		if (!this.signouting) {
			this.render(() => this.signouting = true);
			this.authService.doLogout().then(
				() => {
					this.render(() => this.signouting = false);
				},
				(error) => {
					this.render(() => this.signouting = false);
					console.log(error);
				}
			);
		}
	}

	public onMenuItemClick() {
		if (this.menuExpanded) {
			this.render(() => {
				this.menuExpanded = false;
			});
		}
	}

	public toggleMenu() {
		this.render(() => {
			this.menuExpanded = !this.menuExpanded;
		});
	}
}