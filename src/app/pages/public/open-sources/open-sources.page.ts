import { Page, PreparePage } from '@nimble-ts/core/page';

@PreparePage({
    template: require('./open-sources.page.html'),
    style: require('./open-sources.page.scss'),
    title: 'Eric Ferreira - Open Sources'
})
export class OpenSourcesPage extends Page {

	public repositories = {
		main: [
			{
				name: 'nimble/core',
				description: 'Dependência principal do Nimble framework.',
				url: 'https://github.com/ericferreira1992/nimble',
				tecnology: 'ts'
			},
			{ 
				name: 'nimble/cli',
				description: 'CLI para desenvolvimento do Nimble framework, que também é uma dependência de desenvolvimento de um projeto Nimble.',
				url: 'https://github.com/ericferreira1992/nimble-cli',
				tecnology: 'ts'
			},
			{ 
				name: 'ag-table',
				description: 'Componente desenvolvido para aplicações Angular, com objeto de ser um data-table simples e completo.',
				url: 'https://github.com/ericferreira1992/ag-table',
				tecnology: 'ts'
			},
			{ 
				name: 'ag-virtual-scroll',
				description: 'Componente de virtualização de dados (elementos) através do conceito de virtual-scroll, para aplicações Angular.',
				url: 'https://github.com/ericferreira1992/ag-virtual-scroll',
				tecnology: 'ts'
			},
			{ 
				name: 'slider-carousel',
				description: 'Um slider de imagens em formato de carrossel e com visulização em full-screen, para aplicações Angular.',
				url: 'https://github.com/ericferreira1992/slider-carousel',
				tecnology: 'ts'
			},
			{ 
				name: 'alphabet-filter',
				description: 'Componente que lembra bastante uma agenda de contatos de forma alfabética, contendo todas as letras do alfabeto, indicando a letra correspondente ao nomes que estão sendo visualizados naquele momento.',
				url: 'https://github.com/ericferreira1992/alphabet-filter',
				tecnology: 'ts'
			}
		],
		others: [
			{
				name: 'pac-coin',
				description: 'Remake do jogo Pac-man, feito em TypeScript utilizando HTML5 Canvas.',
				url: 'https://github.com/ericferreira1992/pac-coin',
				tecnology: 'ts'
			},
			{
				name: 'web-components',
				description: 'Repositório de estudo sobre web-components.',
				url: 'https://github.com/ericferreira1992/web-components',
				tecnology: 'js'
			},
			{
				name: 'hunger-time',
				description: 'Aplicação de um e-commerce feita em Flutter para estudos.',
				url: 'https://github.com/ericferreira1992/hunger-time',
				tecnology: 'dart'
			},
			{
				name: 'dirty-check-zonejs',
				description: 'Repositório de estudo sobre dirty-check usando ZoneJs (o mesmo utilizado pelo Angular).',
				url: 'https://github.com/ericferreira1992/dirty-check-zonejs',
				tecnology: 'js'
			},
			{
				name: 'dynamicToObject',
				description: 'Classe em C# para .NET, que transforma um objeto dynamic em uma classe específica, utilizando Reflection.',
				url: 'https://github.com/ericferreira1992/dynamicToObject',
				tecnology: 'csharp'
			},
			{
				name: 'pong',
				description: 'Remake simples do jogo Pong utilizando HTML5 Canvas.',
				url: 'https://github.com/ericferreira1992/pong',
				tecnology: 'js'
			},
		],
		contributions: [
		]
	};

    constructor() {
        super();
    }

    onEnter() {
    }

    onExit() {
    }
}