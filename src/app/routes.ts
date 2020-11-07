import { RouteBase } from '@nimble-ts/core/route';

export const ROUTES: RouteBase[] = [
	{
		path: '',
		page: () => import('./pages/root/root.page').then(x => x.RootPage),
		children: [
			{
				path: '',
				page: () => import('./pages/public/public.page').then(x => x.PublicPage),
				children: [
					{ path: '', redirect: 'blog' },
					{
						path: 'blog',
						children: [
							{
								path: '',
								page: () => import('./pages/public/blog/blog.page').then(x => x.BlogPage)
							},
							{
								path: 'article',
								children: [
									{ path: '', redirect: 'blog' },
									{
										path: 'new',
										page: () => import('./pages/public/blog/add-article/add-article.page').then(x => x.AddArticlePage)
									},
									{
										path: '{id}',
										page: () => import('./pages/public/blog/article/article.page').then(x => x.ArticlePage)
									}
								]
							}
						]
					},
					{
						path: 'about-me',
						page: () => import('./pages/public/about-me/about-me.page').then(x => x.AboutMePage)
					},
					{
						path: 'open-sources',
						page: () => import('./pages/public/open-sources/open-sources.page').then(x => x.OpenSourcesPage)
					},
					{
						path: 'skills',
						page: () => import('./pages/public/skills/skills.page').then(x => x.SkillsPage)
					},
					{
						path: 'contact',
						page: () => import('./pages/public/contact/contact.page').then(x => x.ContactPage)
					}
				]
			}  
		]
	}
];