export default class AboutMePage {
    templateUrl = 'views/about-me.html';
    element = null;
    animationClass = 'fadeIn';

    get isMobile() { return window.innerWidth < 1000; }

    constructor() {
        if (this.isMobile)
            this.animationClass = 'rollIn';
    };
}