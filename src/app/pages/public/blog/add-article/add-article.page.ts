import { Page, PreparePage } from '@nimble-ts/core/page';
import { RouteParams } from '@nimble-ts/core/providers/route-params/route-params';
import { Form, Validators } from '@nimble-ts/core/forms';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from '../models/article.model';

// import * as Quill from 'quill';

@PreparePage({
	template: require('./add-article.page.html'),
	style: require('./add-article.page.scss'),
	title: 'Eric Ferreira - Novo artigo'
})
export class AddArticlePage extends Page {

	public loading: boolean = true;
	public editing: boolean = false;
	// private commentEditor: Quill;

	public form: Form;
	public article: Article;

	private get id(): string { return this.routeParams.params.id; }

	constructor(
		private articleService: ArticleService,
		private routeParams: RouteParams
	) {
		super();
		this.form = new Form({
			content: {}
		});
		this.editing = this.routeParams.params.id;
	}

	public async onInit() {
		if (this.editing) {
			this.article = await this.articleService.getById(this.id);
			this.loading = false;
		}
		else {
			this.loading = false;
		}
	}

	public onAfterInit() {
	}

	/* private prepareEditor() {
		const FontAttributor = Quill.import('attributors/class/font');
		FontAttributor.whitelist = ['montserrat];
		Quill.register(FontAttributor, true);

		var Size = Quill.import('attributors/style/size');
		Size.whitelist = ['14px', '16px', '18px'];
		Quill.register(Size, true);

		this.commentEditor = new Quill('#new-comment-editor', {
			placeholder: 'Escreva um comentário',
			modules: {
				toolbar: [
					[{ 'font': ['montserrat'] }],
					// [{ 'size': ['small', false, 'large', 'huge'] }],
            		[{ 'size': [true, '14px', '16px', '18px'] }],
					[{ 'color': [] }, { 'background': [] }],
					['bold', 'italic', 'underline'],
					['link', 'blockquote', 'code-block', 'image'],
					[{ 'align': [] }],
				]
			},
			theme: 'snow'
		});
	} */
}