import { Page, PreparePage } from '@nimble-ts/core/page';
import { Router } from '@nimble-ts/core/route';

@PreparePage({
    template: require('./root.page.html'),
    style: require('./root.page.scss')
})
export class RootPage extends Page {

    public loading = false;
	public socialMediaItems = [
		{ name: 'Linked In', url: 'https://www.linkedin.com/in/eric-andrade-36565575', imgName: 'linkedin' },
		{ name: 'Email', url: 'mailto:ericferreira1992@gmail.com', imgName: 'email' },
		{ name: 'Github', url: 'https://github.com/ericferreira1992', imgName: 'github' },
		{ name: 'Medium', url: 'https://medium.com/@ericandrade_24404', imgName: 'medium' }
	];
    private cancelListeners: (() => void)[] = [];

    onInit() {
        this.cancelListeners = [
			Router.onStartChange(() => {
                this.render(() => this.loading = true);
			}),
			Router.onEndChange(() => {
				this.render(() => this.loading = false);
			})
        ]
	}

    onDestroy() {
        this.cancelListeners.forEach(unlistener => {
			unlistener();
		});
    }
}