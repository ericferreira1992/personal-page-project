import { Page, PreparePage } from '@nimble-ts/core/page';

@PreparePage({
    template: require('./contact.page.html'),
    style: require('./contact.page.scss'),
    title: 'Contato - Eric Ferreira'
})
export class ContactPage extends Page {

	public contacts = [
		{ id: 'Linkedin', name: '@eric-andrade-ferreira-36565575', url: 'https://www.linkedin.com/in/eric-andrade-ferreira-36565575', iconName: 'linkedin' },
		{ id: 'E-mail', name: 'ericferreira1992@gmail.com', url: 'mailto:ericferreira1992@gmail.com', iconName: 'email' },
		{ id: 'Github', name: '@ericferreira1992', url: 'https://github.com/ericferreira1992', iconName: 'github' },
		{ id: 'Medium', name: '@ericandrade_24404', url: 'https://medium.com/@ericandrade_24404', iconName: 'medium' },
	];

    constructor() {
        super();
    }

    onEnter() {
    }

    onExit() {
    }
}