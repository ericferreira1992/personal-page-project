import AboutMePage from  '../about-me/about-me.js';
import MySkillsPage from  '../my-skills/my-skills.js';
import MyWorksPage from  '../my-works/my-works.js';
import TalkMePage from  '../talk-me/talk-me.js';
import Router from  '../router.js';
import * as WOW from  'wow.js/dist/wow';

export class MainPage {
    templateUrl = 'views/main-page.html';

    circleDiameter = 450;
    divisionHyp = 140;
    minorMeasure = 0;
    greaterMeasure = 0;

    topDivisionsScale = 1;
    leftDivisionsScale = 1;
    fullDivisionsScale = 1;

    generalScale = 1;

    currentPageNumber = 0;
    currentPage = null;

    loadingCurrentPage = false;

    router;

    get isMobile() { return window.innerWidth < 1000; }

    constructor() {
        this.defineStylesVariables();
        this.render();
        window.addEventListener('resize', this.defineStylesVariables.bind(this));
        window.addEventListener('mousemove', this.onMouseMove.bind(this));

        this.router = new Router();
        this.router.listen().onResolve(this.selectPage.bind(this));
    };

    render() {
        this.loadTemplate(this.templateUrl, (textHtml) => {
            document.body.insertAdjacentHTML('afterbegin', textHtml);
        });

        this.onInit();
    }

    onInit() {
        setTimeout(() => {
            let divisions = document.querySelector('.main-divisions');
            divisions.classList.add('main-divisions-rendered');
        }, 500);
    }

    onMouseMove(e) {
        let mainPhotoCircle = document.body.querySelector('.main-photo-circle');
        if (mainPhotoCircle) {
            if (window.innerWidth >= 1000) {
                let rotate_X;
                let rotate_Y;
    
                let windowMidPointX = window.innerWidth / 2;
                let windowMidPointY = window.innerHeight / 2;
    
                rotate_X = windowMidPointX - e.pageX;
                rotate_Y = windowMidPointY - e.pageY;
    
                rotate_X = Math.floor(rotate_X * .2);
                rotate_Y = Math.floor(-rotate_Y * .2);
    
                if (rotate_X < -35) rotate_X = -35;
                if (rotate_X > 35) rotate_X = 35;
    
                if (rotate_Y < -35) rotate_Y = -35;
                if (rotate_Y > 35) rotate_Y = 35;

                mainPhotoCircle.style.transform = `translate(-50%, -50%) translate3d(0,0,0) rotateX(${rotate_Y}deg) rotateY(${rotate_X}deg)`;
            }
            else
                mainPhotoCircle.style.transform = `translate(-50%, -50%) translate3d(0,0,0) rotateX(0deg) rotateY(0deg)`;
        }
    }

    defineStylesVariables() {
        this.greaterMeasure = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;
        this.minorMeasure = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;

        this.topDivisionsScale = parseFloat(((window.innerHeight / 2) / this.divisionHyp).toFixed(1));
        this.leftDivisionsScale = parseFloat(((window.innerWidth / 2) / this.divisionHyp).toFixed(1));
        this.fullDivisionsScale = parseFloat((this.greaterMeasure / this.divisionHyp).toFixed(1));

        if (this.minorMeasure < (this.circleDiameter + 50))
            this.generalScale = parseFloat((this.minorMeasure / (this.circleDiameter + 50)).toFixed(1));

        document.documentElement.style.setProperty('--scale-divisions-x', this.leftDivisionsScale);
        document.documentElement.style.setProperty('--scale-divisions-y', this.topDivisionsScale);
        document.documentElement.style.setProperty('--scale-divisions-full', this.fullDivisionsScale);

        document.documentElement.style.setProperty('--scale-general', this.generalScale);

        if (window.innerWidth < 1000) 
            this.onMouseMove();
    };

    goRoute(route) {
        this.router.redirect(route);
    }

    selectPage(pageNumber) {
        if (!this.loadingCurrentPage) {
            if (pageNumber && !this.currentPage) {
                let gereralPageEl = this.getGeneralPage();
            
                if (this.currentPageNumber > 0)
                    gereralPageEl.classList.remove('selected-page-0' + this.currentPageNumber);
                this.currentPageNumber = pageNumber;
    
                gereralPageEl.classList.add('selected-page-0' + pageNumber);
    
                let closeCurrentPageEl = document.createElement('div');
                let positionClass = pageNumber === 1 ? 'bottom-left' : (pageNumber === 2 ? 'top-left' : (pageNumber === 3 ? 'top-right' : 'bottom-right'));
                closeCurrentPageEl.classList.add('close-current-page', positionClass, 'animated', 'fadeIn');
                closeCurrentPageEl.onclick = () => this.goRoute('');
                document.body.prepend(closeCurrentPageEl);
    
                this.loadCurrentPage();
            }
            else if (this.currentPage) {
                this.exitPage();
            }
        }
    };

    exitPage() {
        if (this.currentPage !== null && !this.loadingCurrentPage) {

            let closeCurrentPageEl = document.body.querySelector('.close-current-page');

            closeCurrentPageEl && closeCurrentPageEl.classList.remove('fadeIn');
            closeCurrentPageEl && closeCurrentPageEl.classList.add('fadeOut');

            this.currentPage && this.currentPage.element.classList.remove(this.isMobile ? 'jackInTheBox' : 'fadeIn');
            this.currentPage && this.currentPage.element.classList.add(this.isMobile ? 'zoomOut' : 'fadeOut');

            setTimeout(() => {
                this.currentPage && this.currentPage.element.remove();
                this.currentPage = null;

                let gereralPageEl = this.getGeneralPage();
        
                gereralPageEl.classList.remove('selected-page-0' + this.currentPageNumber);
                this.currentPageNumber = 0;

                let divisions = document.querySelector('.main-divisions');
                divisions.classList.add('main-divisions-rendered');

                setTimeout(() => {
                    closeCurrentPageEl &&  closeCurrentPageEl.remove();
                }, 200);
            }, 400);
        }
    };

    getGeneralPage() {
        return document.getElementsByClassName('general-page')[0];
    };

    loadCurrentPage() {
        switch(this.currentPageNumber) {
            case 1: {
                this.currentPage = new AboutMePage();
                break;
            }
            case 2: {
                this.currentPage = new MySkillsPage();
                break;
            }
            case 3: {
                this.currentPage = new TalkMePage();
                break;
            }
            case 4: {
                this.currentPage = new MyWorksPage();
                break;
            }
        }

        this.renderCurrentPage();
    }

    renderCurrentPage() {
        if (this.currentPage) {
            this.loadingCurrentPage = true;
            this.loadTemplate(this.currentPage.templateUrl, (textHtml) => {
                let currentPageEl = document.createElement('div');
                currentPageEl.innerHTML = textHtml;
                currentPageEl.classList.add('current-page', 'animated', this.isMobile ? 'jackInTheBox' : 'fadeIn');
                document.body.append(currentPageEl);

                this.currentPage.element = currentPageEl;

                this.loadingCurrentPage = false;

                setTimeout(() => {
                    let divisions = document.querySelector('.main-divisions');
                    divisions.classList.remove('main-divisions-rendered');
                }, 400);
                
                setTimeout(() => {
                    let wow = new WOW({ scrollContainer: '.current-page > section' });
                    wow.init();
                });
            });
        }
    }

    loadTemplate(templateUrl, onload) {
        let client = new XMLHttpRequest();
        client.open('GET', templateUrl);

        client.onloadend = () => {
            onload(client.responseText);
        };

        client.send()
    }
}