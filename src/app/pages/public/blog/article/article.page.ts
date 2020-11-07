import { Page, PreparePage } from '@nimble-ts/core/page';
import { RouteParams } from '@nimble-ts/core/providers/route-params/route-params';
import { Form, Validators } from '@nimble-ts/core/forms';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from '../models/article.model';
import { Comment } from '../models/comment.model';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { AuthGuestDialog } from 'src/app/dialogs/auth-guest/auth-guest.dialog';
import { DialogBuilder } from '@nimble-ts/core/dialog';
import { CommentLike } from '../models/comment-like.model';
import { ConfirmDialog } from 'src/app/dialogs/confirm/confirm.dialog';
// import * as Quill from 'quill';

@PreparePage({
	template: require('./article.page.html'),
	style: require('./article.page.scss'),
	title: 'Eric Ferreira - Article'
})
export class ArticlePage extends Page {

	public loading: boolean = true;
	public commentsLoading: boolean = true;
	public addingCommment: boolean = false;
	public article: Article = null;
	public comments: Comment[] = [];

	// private commentEditor: Quill;

	public commentForm = new Form({
		content: {
			value: '',
			validators: [
				Validators.required,
				Validators.minLength(10),
				Validators.maxLength(124),
			]
		}
	});

	private get id(): string { return this.routeParams.params.id; }

	constructor(
		private articleService: ArticleService,
		private authService: FirebaseAuthService,
		private routeParams: RouteParams,
		private dialogBuilder: DialogBuilder
	) {
		super();
	}

	public async onInit(): Promise<void> {
		this.article = await this.articleService.getById(this.id);
		this.loading = false;
	}

	public onAfterInit() {
		this.getComments();
	}

	private async getComments() {
		this.comments = await this.articleService.getComments(this.id);
		this.commentsLoading = false;
		this.render();
	}

	public async toggleSubComments(comment: Comment) {
		if (!comment.showSubcomments && !comment.loadingSubcomments) {
			this.render(() => {
				comment.showSubcomments = true;
				comment.loadingSubcomments = true;
			});

			try {
				comment.subComments = await this.articleService.getComments(this.id, comment.id);
				this.render(() => comment.loadingSubcomments = false).then(x => {
					comment.form.get('content').elements[0].focus();
				});
			}
			catch{
				this.render(() => {
					comment.showSubcomments = false;
					comment.loadingSubcomments = false;
				});
			}
		}
		else if (!comment.loadingSubcomments) {
			comment.form.get('content').elements[0].focus();
		}
	}

	public async onCommentSubmit(parentId?: string) {
		const parentComment = !parentId ? null : this.comments.find(x => x.id === parentId);
		const form = !parentComment ? this.commentForm : parentComment?.form;

		if (form?.isValid) {
			if (this.authService.isLogged) {
				try {
					this.render(() => {
						if (parentComment) {
							parentComment.addingSubComment = true;
						}
						else {
							this.addingCommment = true;
						}
					});

					const user = this.authService.user;
					const comment = new Comment({
						id: null,
						parentId: parentId ?? null,
						articleId: this.id,
						authorName: user.displayName,
						authorPhotoUrl: user.photoURL,
						authorEmail: user.email,
						content: form?.get('content').value
					});
					comment.id = await this.articleService.addComment(comment);
					form.reset();
					if (parentComment) {
						parentComment?.subComments.push(comment);
					}
					else {
						this.comments.push(comment);
					}
				}
				catch(e) {
					console.error(e);
				}
				this.render(() => {
					if (parentComment) {
						parentComment.addingSubComment = false;
					}
					else {
						this.addingCommment = false;
					}
				});
			}
			else {
				this.dialogBuilder.open(AuthGuestDialog).onClose.then(() => {
					if (this.authService.isLogged) {
						this.onCommentSubmit(parentId);
					}
				});
			}
		}
	}

	public toggleLike(comment: Comment) {
		if (this.authService.isLogged) {
			const like = this.getUserLikeOfComment(comment);
			if (like != null) {
				this.unlikeComment(comment, like);
			}
			else {
				this.likeComment(comment);
			}
		}
		else {
			this.dialogBuilder.open(AuthGuestDialog).onClose.then(() => {
				if (this.authService.isLogged) {
					if (this.getUserLikeOfComment(comment) == null) {
						this.likeComment(comment);
					}
				}
			});
		}
	}

	private async likeComment(comment: Comment) {
		if (!comment.liking) {
			this.render(() => comment.liking = true);
			try {
				const like = await this.articleService.likeComment(comment);
				comment.likes.push(like);
			}
			catch (e) {}
			this.render(() => comment.liking = false);
		}
	}

	private async unlikeComment(comment: Comment, like: CommentLike) {
		if (!comment.liking) {
			this.render(() => comment.liking = true);
			try {
				await this.articleService.unlikeComment(like.id);
				comment.likes = comment.likes.filter(x => x !== like);
			}
			catch (e) {
	
			}
			this.render(() => comment.liking = false);
		}
	}

	public removeComment(comment: Comment) {
		if (!comment.deleting) {
			this.dialogBuilder.open(ConfirmDialog, {
				data: {
					text: 'Deseja realmente excluir este comentário?'
				}
			}).onClose.then(async (ok) => {
				if (ok) {
					this.render(() => comment.deleting = true);
					try {
						await this.articleService.removeComment(comment.id);
						if (comment.parentId) {
							const parentComment = this.comments.find(x => x.id === comment.parentId);
							parentComment.subComments = parentComment.subComments.filter(x => x.id !== comment.id);
						}
						else {
							this.comments = this.comments.filter(x => x.id !== comment.id);
						}
					}
					catch (e) {}
					this.render(() => comment.deleting = false);
				}
			});
		}
	}
	
	public getUserLikeOfComment(comment: Comment): CommentLike {
		if (this.authService.isLogged) {
			return comment.likes.find(x => x.authorEmail === this.authService.user.email);
		}
		return null;
	}

	public canRemoveComment(comment: Comment): boolean {
		if (this.authService.isLogged) {
			const user = this.authService.user;
			return user.isAdmin || comment.authorEmail === user.email;
		}
		return false;
	}

	/* private prepareCommentEditor() {
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