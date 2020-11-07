export default class Router {
    gtag () { dataLayer.push(arguments); };

    gaID = 'UA-137851769-1';

    listening = null;
    currentRoute = '';
    
    resolveFn = null;
    
    get routes() {
        return [
            { id: null, path: '' },
            { id: 1, path: 'about-me' },
            { id: 2, path: 'my-skills' },
            { id: 3, path: 'talk-me' },
            { id: 4, path: 'my-works' }
        ];
    }
    
    get pureRoute() { return this.currentRoute.replace(/\/|#/g, ''); }

    constructor() {
        window.dataLayer = window.dataLayer || [];
        this.gtag('js', new Date());
        this.gtag('config', this.gaID);
    }

    listen() {
        this.listening = setInterval(() => {
            if (location.hash !== this.currentRoute) {
                this.currentRoute = location.hash;
                this.onResolve();
            }
        }, 200);

        return {
            onResolve: (resolveFn) => this.resolveFn = resolveFn
        }
    }

    onResolve() {
        if (this.resolveFn) {
            let route = this.routes.find(x => x.path === this.pureRoute);
            if (route) {
                this.gtag('config', this.gaID, {'page_path': '/' + this.pureRoute});
                this.resolveFn(route.id);
            }
            else {
                console.warn(`Page "${this.currentRoute}" not found.`);
                this.redirect('');
            }
        }
    }

    redirect(route) {
        location.hash = (route.startsWith('/') ? '' : '/') + route;
    }
}