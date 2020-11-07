import { Form, Validators } from "@nimble-ts/core/forms";
import { CommentLike } from "./comment-like.model";

export class Comment {
	private _id: string;
	public parentId: string;
	public articleId: string;
	public authorName: string;
	public authorPhotoUrl: string;
	public authorEmail: string;
	public content: string;
	public createDate? = new Date();

	public set id(value: string) {
		this._id = value;

		if (this.id && !this.form) {
			this.form = new Form({
				content: {
					value: '',
					validators: [
						Validators.required,
						Validators.minLength(10),
						Validators.maxLength(124),
					]
				}	
			});
		}
	}
	public get id() { return this._id; }

	// INTERNAL
	public likes?: CommentLike[] = [];
	public quantityComments?: number = 0;

	// IGNORE
	public liking: boolean = false;
	public deleting: boolean = false;
	public addingSubComment: boolean = false;
	public get anyLoading() {
		return this.liking ||
			this.deleting ||
			this.addingSubComment ||
			this.loadingSubcomments;
	}

	public showSubcomments: boolean = false;
	public loadingSubcomments: boolean = false;
	public subComments: Comment[] = [];

	public form: Form;

	constructor(obj: Partial<Comment>) {
		Object.assign(this, obj);
	}
}