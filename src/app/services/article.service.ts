import { Injectable } from '@nimble-ts/core/inject';
import { Article } from 'src/app/pages/public/blog/models/article.model';
import { Comment } from 'src/app/pages/public/blog/models/comment.model';
import { CommentLike } from '../pages/public/blog/models/comment-like.model';
import { FirebaseAuthService } from './firebase-auth.service';
import { FireBaseService, Timestamp } from './firebase.service';

@Injectable({ single: true })
export class ArticleService {

    constructor(
		private firebaseService: FireBaseService,
		private authService: FirebaseAuthService,
	) {
	}
	
	public async get(): Promise<Article[]> {
		const snapshot = await this.firebaseService.app.firestore()
			.collection('articles')
			.orderBy('createDate', 'desc')
			.get();

		return snapshot.docs.map(x => {
			const data = x.data();
			return new Article({
				id: x.id,
				...data,
				createDate: data.createDate.toDate()
			});
		});
	}
	
	public async getById(id: string): Promise<Article> {
		const snapshot = await this.firebaseService.app.firestore()
			.collection('articles')
			.doc(id)
			.get();
			
		const docData = snapshot.data();
		return new Article({
			id: snapshot.id,
			...docData,
			createDate: docData.createDate.toDate()
		});
	}
	
	public async getComments(articleId: string, parentId?: string): Promise<Comment[]> {
		let query = this.firebaseService.app.firestore()
			.collection('articles-comments')
			.where('articleId', '==', articleId)
			.where('parentId', '==', parentId ? parentId : null);

		const snapshot = await query.orderBy('createDate', 'asc').get();

		const comments = [];
		for (let doc of snapshot.docs) {
			const data = doc.data();
			comments.push(new Comment({
				...data,
				id: doc.id,
				likes: await this.getCommentLikes(doc.id),
				quantityComments: await this.getHowManyCommentsHave(doc.id),
				createDate: data.createDate.toDate()
			}));
		}
		return comments;
	}

	public async getCommentLikes(id: string): Promise<CommentLike[]> {
		const snapshot = await this.firebaseService.app.firestore()
			.collection('comments-likes')
			.where('commentId', '==', id)
			.orderBy('createDate', 'desc')
			.get();

		return snapshot.docs.map<any>(x => {
			const data = x.data();
			return {
				id: x.id,
				...data,
				createDate: data.createDate.toDate()
			}
		});
	}

	public async getHowManyCommentsHave(id: string): Promise<number> {
		const snapshot = await this.firebaseService.app.firestore()
			.collection('articles-comments')
			.where('parentId', '==', id)
			.get();

		return snapshot.size;
	}
	

	// COMMENTS

	public async addComment(comment: Comment): Promise<string> {
		const data = {
			...comment,
			createDate: Timestamp.fromDate(comment.createDate)
		};

		// delete data.id;
		delete data.likes;
		delete data.quantityComments;
		delete data.liking;
		delete data.deleting;
		delete data.showSubcomments;
		delete data.loadingSubcomments;
		delete data.addingSubComment;
		delete data.subComments;
		delete data.form;

		const docRef = await this.firebaseService.app.firestore()
			.collection('articles-comments')
			.add(data);
		return docRef.id;
	}
	
	public async removeComment(commentId: string): Promise<void> {

		await this.firebaseService.app.firestore()
			.collection('articles-comments')
			.doc(commentId)
			.delete();

		// REMOVE LIKES
		const likeDocs = (await this.firebaseService.app.firestore()
			.collection('comments-likes')
			.where('commentId', '==', commentId)
			.get()).docs;

		for(const doc of likeDocs) {
			await this.unlikeComment(doc.id);
		}

		// REMOVE SUB-COMMENTS
		const subCommentsDocs = (await this.firebaseService.app.firestore()
			.collection('articles-comments')
			.where('parentId', '==', commentId)
			.get()).docs;

		for(const doc of subCommentsDocs) {
			await this.removeComment(doc.id);
		}
	}

	// LIKES

	public async likeComment(comment: Comment): Promise<CommentLike> {
		let commentLike = new CommentLike({
			commentId: comment.id,
			articleId: comment.articleId,
			authorName: this.authService.user.displayName,
			authorPhotoUrl: this.authService.user.photoURL,
			authorEmail: this.authService.user.email,
			type: '1',
		});
		let data = {
			...commentLike,
			createDate: Timestamp.fromDate(commentLike.createDate)
		};
		const docRef = await this.firebaseService.app.firestore()
			.collection('comments-likes')
			.add(data);

		commentLike.id = docRef.id;
		return commentLike;
	}
	
	public async unlikeComment(likeId: string): Promise<void> {
		await this.firebaseService.app.firestore()
			.collection('comments-likes')
			.doc(likeId)
			.delete();
	}
}