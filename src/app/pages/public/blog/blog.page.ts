import { Page, PreparePage } from '@nimble-ts/core/page';
import { ArticleService } from 'src/app/services/article.service';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { Article } from './models/article.model';

@PreparePage({
    template: require('./blog.page.html'),
    style: require('./blog.page.scss'),
    title: 'Eric Ferreira - Blog'
})
export class BlogPage extends Page {

	public loading: boolean = true;
	public articles: Article[] = [];
	public adminMenu = [
		{ name: 'Novo artigo', path: 'blog/article/new' }
	];

	public get adminIsLogged() {
		return this.authService.adminIsLogged;
	}

    constructor(
		private authService: FirebaseAuthService,
		private articleService: ArticleService
	) {
        super();
    }

    public async onInit() {
		this.articles = await this.articleService.get();
		this.loading = false;
    }

    public onDestroy() {
    }
}