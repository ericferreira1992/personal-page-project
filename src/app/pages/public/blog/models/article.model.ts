export class Article {
	public id: string;
	public title: string;
	public preContent: string = '';
	public content: string = '';
	public externalUrl?: string = '';
	public authorName: string;
	public authorPhotoUrl: string;
	public authorEmail: string;
	public createDate?: Date = new Date();
	public updatedDate?: Date = null;

	public quantityComments?: number = 0;
	public likes?: any[] = [];

	public get isExtenal() {
		return (this.externalUrl ?? '') !== '';
	}

	constructor(obj: Partial<Article>) {
		Object.assign(this, obj);
	}
}