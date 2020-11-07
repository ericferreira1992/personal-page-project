export class CommentLike {
	public id: string;
	public commentId: string;
	public articleId: string;
	public authorName: string;
	public authorPhotoUrl: string;
	public authorEmail: string;
	public type: '1' | '0';
	public createDate? = new Date();

	constructor(obj: Partial<CommentLike>) {
		Object.assign(this, obj);
	}
}