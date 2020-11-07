import { Page, PreparePage } from '@nimble-ts/core/page';

@PreparePage({
    template: require('./about-me.page.html'),
    style: require('./about-me.page.scss'),
    title: 'Sobre mim - Eric Ferreira'
})
export class AboutMePage extends Page {

    constructor() {
        super();
    }

    onEnter() {
    }

    onExit() {
    }
}