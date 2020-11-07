(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{61:function(t,e,n){"use strict";n.d(e,"a",(function(){return i.a})),n.d(e,"b",(function(){return c}));var i=n(22);class o{constructor(t){Object.assign(this,t)}}class s{constructor(t){this.description="",this.keywords="",this.og={},Object.assign(this,t),this.og&&(this.og=new o(this.og))}}class a{constructor(t){this.template="",this.style="",this.title="",this.meta={},Object.assign(this,t),this.meta&&(this.meta=new s(this.meta))}}var r=n(3);n(23);function c(t){return function(e){return t=new a(t),Object.assign(e.prototype,t),Reflect.defineMetadata(r.a,!0,e),e}}},62:function(t,e,n){"use strict";n.d(e,"b",(function(){return i.a})),n.d(e,"c",(function(){return s.b})),n.d(e,"a",(function(){return s.a})),n.d(e,"d",(function(){return a.a})),n.d(e,"e",(function(){return c}));var i=n(38);class o{constructor(t){this.template="",this.style="",Object.assign(this,t)}}var s=n(44),a=n(39),r=n(3);function c(t){return function(e){return t=new o(t),Object.assign(e.prototype,t),Reflect.defineMetadata(r.a,!0,e),e}}},73:function(t,e){t.exports='<div class=auth-guest-dialog> <div class=header> <h3> Autenticação necessária <button class="btn only-icon float-right opacity-70 opacity-hover-100" (click)=dialogRef.close(false) title=Fechar> <img class=d-block src=assets/img/icons/close.svg#dark width=20 alt=close> </button> </h3> <p class=mt-2>Para continuar, você precisar fazer login por uma destas formas:</p> </div> <p @if=errorMsg class="text-error mt-6"> {{errorMsg}} </p> <div class=social-buttons> <button class="social-btn fb w-100" (click)="doAuth(\'fb\')"> <img src=assets/img/social/facebook.svg alt=Facebook /> <span>Continiuar com <strong>Facebook</strong></span> </button> <button class="social-btn gog w-100" (click)="doAuth(\'goo\')"> <img src=assets/img/social/google.svg alt=Google /> <span>Continiuar com <strong>Google</strong></span> </button> <button class="social-btn gh w-100" (click)="doAuth(\'gh\')"> <img src=assets/img/social/github.svg alt=Gihub class=mr-4 /> <span>Continiuar com <strong>Github</strong></span> </button> </div> </div>'},74:function(t,e,n){},75:function(t,e){t.exports='<div class=confirm-dialog> <h3 class=color-title>Confirmação</h3> <p class="mt-2 mb-6">{{text}}</p> <div class="footer pt-3"> <button class=btn (click)=dialogRef.close(false)> {{cancelText}} </button> <button class="btn primary" (click)=dialogRef.close(true)> {{confirmText}} </button> </div> </div>'},76:function(t,e,n){},77:function(t,e){t.exports='<div class=article-page> <div @if=loading class=loading> Carregando artigo... </div> <article @if=!loading class="animated fadeIn"> <h1> {{article.title}} </h1> <div class=author> <div class=img> <img [src]=article.authorPhotoUrl /> </div> <div class=info> <p class="mb-0 f-w-600"> {{article.authorName}} </p> <p class="date mb-0"> <span class=f-w-500>Publicado em</span>: {{article.createDate.toLocaleString()}} </p> <p @if=article.updatedDate class="date mb-0"> <span class=f-w-500>Última atualização</span>: {{article.updatedDate.toLocaleString()}} </p> </div> </div> <p [html]=article.content> </p> </article> <div @if=!loading class="comments animated fadeIn"> <h3>Comentários</h3> <div @if=commentsLoading class=loading> Carregando... </div> <ul @if="!commentsLoading && comments.length > 0" class="animated fadeIn"> <li @for="comment of comments" [style]="comment.anyLoading ? \'opacity: .6\' : null"> <div class="d-table-cell va-top"> <img [src]=comment.authorPhotoUrl /> </div> <div class="d-table-cell va-top pl-4"> <div class=comment-header> <p class="mt-3 mb-0"> <strong>{{comment.authorName}}</strong> - {{comment.createDate.toLocaleString()}} </p> </div> <p class="mt-5 mb-1" [html]=comment.content></p> <ul class=comments-footer> <li> <a href=# (click)=toggleLike(comment) [class]="{ \'disabled\': comment.anyLoading }"> <span @if="comment.likes.length > 0">({{comment.likes.length}})</span> {{getUserLikeOfComment(comment) != null ? \'Descurtir\' : \'Curtir\'}} </a> </li> <li> <a href=# (click)=toggleSubComments(comment) [class]="{ \'disabled\': comment.anyLoading }"> <span @if="comment.quantityComments === 0">Responder</span> <span @if="comment.quantityComments > 0">({{comment.quantityComments}}) Respostas</span> </a> </li> <li @if=canRemoveComment(comment)> <a href=# (click)=removeComment(comment) [class]="{ \'disabled\': comment.anyLoading }">Excluir</a> </li> </ul> <div @if=comment.showSubcomments class="comments animated fadeIn"> <div @if=comment.loadingSubcomments class=loading> Carregando... </div> <ul @if="!comment.loadingSubcomments && comment.subComments.length > 0" class="animated fadeIn"> <li @for="subComment of comment.subComments" [style]="subComment.anyLoading ? \'opacity: .6\' : null"> <div class="d-table-cell va-top"> <img [src]=subComment.authorPhotoUrl /> </div> <div class="d-table-cell va-top pl-4"> <div class=comment-header> <p class="mt-3 mb-0"> <strong>{{subComment.authorName}}</strong> - {{subComment.createDate.toLocaleString()}} </p> </div> <p class="mt-5 mb-1" [html]=subComment.content></p> <ul class=comments-footer> <li> <a href=# (click)=toggleLike(subComment) [class]="{ \'disabled\': subComment.anyLoading }"> <span @if="subComment.likes.length > 0">({{subComment.likes.length}})</span> {{getUserLikeOfComment(subComment) != null ? \'Descurtir\' : \'Curtir\'}} </a> </li> <li @if=canRemoveComment(subComment)> <a href=# (click)=removeComment(subComment) [class]="{ \'disabled\': subComment.anyLoading }">Excluir</a> </li> </ul> </div> </li> </ul> <form @if=!comment.loadingSubcomments [form]=comment.form (submit)=onCommentSubmit(comment.id) class=mt-2> <div class=form-group> <textarea class=form-control form-field-name=content placeholder="Deixar um comentário" maxlength=124 [disabled]=comment.addingSubComment></textarea> <span @if="comment.form.get(\'content\').hasError(\'required\')" class="text-error mt-2"> Escreva algum cometário para enviar. </span> <span @if="!comment.form.get(\'content\').hasError(\'required\') && comment.form.get(\'content\').hasError(\'minLength\')" class="text-error mt-2"> Escreva ao menos {{comment.form.get(\'content\').errors.minLength}} caracteres </span> <button class="btn float-right" [disabled]="!comment.form.isValid || comment.addingSubComment"> {{comment.addingSubComment ? \'Enviando...\' : \'Enviar\'}} </button> </div> </form> </div> </div> </li> </ul> <form @if=!commentsLoading [form]=commentForm (submit)=onCommentSubmit()> <div class=form-group> <textarea class=form-control form-field-name=content placeholder="Deixar um comentário" maxlength=124 [disabled]=addingCommment></textarea> <span @if="commentForm.get(\'content\').hasError(\'required\')" class="text-error mt-2"> Escreva algum cometário para enviar. </span> <span @if="!commentForm.get(\'content\').hasError(\'required\') && commentForm.get(\'content\').hasError(\'minLength\')" class="text-error mt-2"> Escreva ao menos {{commentForm.get(\'content\').errors.minLength}} caracteres </span> <button class="btn float-right" [disabled]="!commentForm.isValid || addingCommment"> {{addingCommment ? \'Enviando...\' : \'Enviar\'}} </button> </div> </form> </div> </div>'},78:function(t,e,n){},94:function(t,e,n){"use strict";n.r(e),n.d(e,"ArticlePage",(function(){return x}));var i=n(61),o=n(19),s=n(24),a=n(45),r=n(46),c=n(27),m=n(62),l=n(15),d=function(t,e,n,i){var o,s=arguments.length,a=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,i);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(a=(s<3?o(a):s>3?o(e,n,a):o(e,n))||a);return s>3&&a&&Object.defineProperty(e,n,a),a},u=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},h=function(t,e){return function(n,i){e(n,i,t)}},f=function(t,e,n,i){return new(n||(n=Promise))((function(o,s){function a(t){try{c(i.next(t))}catch(t){s(t)}}function r(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,r)}c((i=i.apply(t,e||[])).next())}))};let g=(()=>{let t=class extends m.b{constructor(t,e){super(),this.dialogRef=t,this.authService=e,this.loading=!1,this.errorMsg=""}doAuth(t){return f(this,void 0,void 0,(function*(){if(!this.loading){this.render(()=>this.loading=!0);try{switch(t){case"goo":yield this.authService.doGoogleAuth(),this.dialogRef.close(!0);break;case"fb":yield this.authService.doFacebookAuth(),this.dialogRef.close(!0);break;case"gh":yield this.authService.doGithubAuth(),this.dialogRef.close(!0)}}catch(t){this.render(()=>{this.loading=!1,this.errorMsg=t.message,console.error(t)})}}}))}};return t=d([Object(m.e)({template:n(73),style:n(74)}),h(0,Object(l.a)(m.a)),u("design:paramtypes",[m.d,c.a])],t),t})();var v=function(t,e,n,i){var o,s=arguments.length,a=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,i);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(a=(s<3?o(a):s>3?o(e,n,a):o(e,n))||a);return s>3&&a&&Object.defineProperty(e,n,a),a},b=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},p=function(t,e){return function(n,i){e(n,i,t)}};let C=(()=>{let t=class extends m.b{constructor(t){var e,n,i;super(),this.dialogRef=t,this.text="Deseja realmente fazer isso?",this.confirmText="Sim",this.cancelText="Não",(null===(e=t.data)||void 0===e?void 0:e.text)&&(this.text=t.data.text),(null===(n=t.data)||void 0===n?void 0:n.confirmText)&&(this.confirmText=t.data.confirmText),(null===(i=t.data)||void 0===i?void 0:i.cancelText)&&(this.cancelText=t.data.cancelText)}onOpen(){}onClose(){}};return t=v([Object(m.e)({template:n(75),style:n(76)}),p(0,Object(l.a)(m.a)),b("design:paramtypes",[m.d])],t),t})();var y=function(t,e,n,i){var o,s=arguments.length,a=s<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,n):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,n,i);else for(var r=t.length-1;r>=0;r--)(o=t[r])&&(a=(s<3?o(a):s>3?o(e,n,a):o(e,n))||a);return s>3&&a&&Object.defineProperty(e,n,a),a},k=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},S=function(t,e,n,i){return new(n||(n=Promise))((function(o,s){function a(t){try{c(i.next(t))}catch(t){s(t)}}function r(t){try{c(i.throw(t))}catch(t){s(t)}}function c(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,r)}c((i=i.apply(t,e||[])).next())}))};let x=(()=>{let t=class extends i.a{constructor(t,e,n,i){super(),this.articleService=t,this.authService=e,this.routeParams=n,this.dialogBuilder=i,this.loading=!0,this.commentsLoading=!0,this.addingCommment=!1,this.article=null,this.comments=[],this.commentForm=new s.a({content:{value:"",validators:[s.b.required,s.b.minLength(10),s.b.maxLength(124)]}})}get id(){return this.routeParams.params.id}onInit(){return S(this,void 0,void 0,(function*(){this.article=yield this.articleService.getById(this.id),this.loading=!1}))}onAfterInit(){this.getComments()}getComments(){return S(this,void 0,void 0,(function*(){this.comments=yield this.articleService.getComments(this.id),this.commentsLoading=!1,this.render()}))}toggleSubComments(t){return S(this,void 0,void 0,(function*(){if(t.showSubcomments||t.loadingSubcomments)t.loadingSubcomments||t.form.get("content").elements[0].focus();else{this.render(()=>{t.showSubcomments=!0,t.loadingSubcomments=!0});try{t.subComments=yield this.articleService.getComments(this.id,t.id),this.render(()=>t.loadingSubcomments=!1).then(e=>{t.form.get("content").elements[0].focus()})}catch(e){this.render(()=>{t.showSubcomments=!1,t.loadingSubcomments=!1})}}}))}onCommentSubmit(t){return S(this,void 0,void 0,(function*(){const e=t?this.comments.find(e=>e.id===t):null,n=e?null==e?void 0:e.form:this.commentForm;if(null==n?void 0:n.isValid)if(this.authService.isLogged){try{this.render(()=>{e?e.addingSubComment=!0:this.addingCommment=!0});const i=this.authService.user,o=new r.a({id:null,parentId:null!=t?t:null,articleId:this.id,authorName:i.displayName,authorPhotoUrl:i.photoURL,authorEmail:i.email,content:null==n?void 0:n.get("content").value});o.id=yield this.articleService.addComment(o),n.reset(),e?null==e||e.subComments.push(o):this.comments.push(o)}catch(t){console.error(t)}this.render(()=>{e?e.addingSubComment=!1:this.addingCommment=!1})}else this.dialogBuilder.open(g).onClose.then(()=>{this.authService.isLogged&&this.onCommentSubmit(t)})}))}toggleLike(t){if(this.authService.isLogged){const e=this.getUserLikeOfComment(t);null!=e?this.unlikeComment(t,e):this.likeComment(t)}else this.dialogBuilder.open(g).onClose.then(()=>{this.authService.isLogged&&null==this.getUserLikeOfComment(t)&&this.likeComment(t)})}likeComment(t){return S(this,void 0,void 0,(function*(){if(!t.liking){this.render(()=>t.liking=!0);try{const e=yield this.articleService.likeComment(t);t.likes.push(e)}catch(t){}this.render(()=>t.liking=!1)}}))}unlikeComment(t,e){return S(this,void 0,void 0,(function*(){if(!t.liking){this.render(()=>t.liking=!0);try{yield this.articleService.unlikeComment(e.id),t.likes=t.likes.filter(t=>t!==e)}catch(t){}this.render(()=>t.liking=!1)}}))}removeComment(t){t.deleting||this.dialogBuilder.open(C,{data:{text:"Deseja realmente excluir este comentário?"}}).onClose.then(e=>S(this,void 0,void 0,(function*(){if(e){this.render(()=>t.deleting=!0);try{if(yield this.articleService.removeComment(t.id),t.parentId){const e=this.comments.find(e=>e.id===t.parentId);e.subComments=e.subComments.filter(e=>e.id!==t.id)}else this.comments=this.comments.filter(e=>e.id!==t.id)}catch(t){}this.render(()=>t.deleting=!1)}})))}getUserLikeOfComment(t){return this.authService.isLogged?t.likes.find(t=>t.authorEmail===this.authService.user.email):null}canRemoveComment(t){if(this.authService.isLogged){const e=this.authService.user;return e.isAdmin||t.authorEmail===e.email}return!1}};return t=y([Object(i.b)({template:n(77),style:n(78),title:"Eric Ferreira - Article"}),k("design:paramtypes",[a.a,c.a,o.a,m.c])],t),t})()}}]);