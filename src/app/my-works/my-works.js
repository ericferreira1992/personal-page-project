export default class MyWorksPage {
    templateUrl = 'views/my-works.html';
    element = null;
    animationClass = 'fadeIn';

    get isMobile() { return window.innerWidth < 1000; }

    constructor() {
        if (this.isMobile)
            this.animationClass = 'rollIn';
    };
}