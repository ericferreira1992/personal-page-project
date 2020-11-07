import { Page, PreparePage } from '@nimble-ts/core/page';

@PreparePage({
    template: require('./skills.page.html'),
    style: require('./skills.page.scss'),
    title: 'Skills'
})
export class SkillsPage extends Page {

	public languanges = [
		{
			id: 'js',
			name: 'JavaScript',
			description: 'Desde os 15 anos tenho me interagio com a área web, e com isso pude ir me aprimorando nas técnicas de JS, HTML e CSS.',
			percentage: 93
		},
		{
			id: 'ts',
			name: 'TypeScript',
			description: 'Após o lançamento do framework Angular 2, comecei a estudar e utilizar o TypeScript em praticamente todo projeto front-end web.',
			percentage: 94
		},
		{
			id: 'csharp',
			name: 'C# (.NET)',
			description: 'Em 2015 iniciei estudos em C# para trabalhar numa empresa onde eu atuaria utilizando a linguagem, onde fiquei utilizando a linguagem até meados de 2018.',
			percentage: 78
		},
		{
			id: 'swift',
			name: 'Swift (iOS)',
			description: 'Em 2019 houve uma opotunidade para atuar no desenvolvimento iOS utilizando Swift, e atualmente é umas das linaguagens que tenho utilizado no dia a dia.',
			percentage: 69
		},
		{
			id: 'dart',
			name: 'Dart (Flutter)',
			description: 'No final de 2019, iniciei um intenso estudo sobre Flutter, entendo como funciona e também no desenvolvimento de aplicativos para Android e iOS usando a linguagem Dart.',
			percentage: 55
		},
		{
			id: 'php',
			name: 'PHP',
			description: 'Praticamente foi a primeira linguagem server-side que utilizei, aos 15 anos de idade. O contato com a linguagem foi diminuindo em 2015, mas ainda tinha contato mesmo que de forma rara.',
			percentage: 70
		}
	];

	public technologies = [
		{
			id: 'ng',
			name: 'Angular 2+',
			description: 'Desde o lançamento do Angular 2, tenho desenvolvido aplicações utilizando o framework, portanto é o framework Web que possuo mais domínio.',
			percentage: 90
		},
		{
			id: 'react',
			name: 'React',
			description: 'Biblioteca que nunca atuei profissionalmente, apenas utilizei a título de estudos.',
			percentage: 65
		},
		{
			id: 'nb',
			name: 'Nimble',
			description: 'Framework desenvolvido por mim, sem a utilização de libs ou dependências de terceiros, onde o seu objeto é facilitar o desenvolvimento de websites.',
			percentage: 100
		},
		{
			id: 'git',
			name: 'Git',
			description: 'Demorei um pouco a mexer somente Git, pois antes utilizava SVN, mas desde 2017 que utilizo apenas Git para versionar tudo.',
			percentage: 72
		},
		{
			id: 'laravel',
			name: 'Laravel',
			description: 'Praticamente primeiro framework de desenvolvimento que utilizei na vida, e foi um impacto muito grande, pois o Laravel realmente revolucionou a forma como se programava em PHP na época.',
			percentage: 66
		},
	];

	public skills = [
		{
			id: 1,
			name: 'Componentização',
			description: 'Sem dúvidas esta é umas das minhas maiores habilidades, pois a paixão pelo desenvolvimento se reflete principalmente no apreço pela criação de componentes, seja qual for.',
			percentage: 100
		},
		{
			id: 2,
			name: 'Ensinamento',
			description: 'Com o passar dos anos, é natural que não tenhamos muitos desafios mais, e o desejo de repassar o conhecimento para os mais jovens ou iniciantes é algo natural.',
			percentage: 80
		},
		{
			id: 3,
			name: 'Trabalho em equipe',
			description: 'Trabalho em equipe é algo essencial, até mesmo pelo fato de não fazermos nada sozinhos, alguém precisa ou precisou colaborar com algo para que tudo corresse bem.',
			percentage: 99
		},
		{
			id: 4,
			name: 'Produtividade com qualidade',
			description: 'Sempre trabalhei com muita itensidade, sempre atento a qualidade e aos prazos de entrega.',
			percentage: 90
		},
		{
			id: 5,
			name: 'Criatividade',
			description: 'Nunca fui uma pessoa muito criativa ao ponto de criar novas telas, pois sou daqueles antigos devs que fazia desde o design ao servidor, mas sempre tive muita criatividade para soluções lógicas.',
			percentage: 98
		},
	];

    constructor() {
        super();
    }

    onEnter() {
    }

    onExit() {
    }
}