import { Page, PreparePage } from '@nimble-ts/core/page';

@PreparePage({
    template: require('./private.page.html'),
    style: require('./private.page.scss'),
    title: 'Private'
})
export class PrivatePage extends Page {

    constructor() {
        super();
    }

    onEnter() {
    }

    onExit() {
    }
}