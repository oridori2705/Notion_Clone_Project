import { EMPTY_TITLE } from '../constants/messages.js';

export default function DocumentList({
	$target,
	initialState,
	onTitleClick,
	onCreatePage,
}) {
	const $nav = document.createElement('nav');
	const $divCreateNewDocument = document.createElement('div');
	const $divListContainer = document.createElement('div');

	$divCreateNewDocument.innerHTML = `<span>새 페이지</span>`;

	$nav.appendChild($divCreateNewDocument);
	$nav.appendChild($divListContainer);
	$target.appendChild($nav);

	this.state = initialState;

	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};

	this.stateRecursion = (documentsArray, $parentElement) => {
		const $ul = document.createElement('ul');
		documentsArray.sort((a, b) => {
			a.createdAt - b.createdAt;
		});

		documentsArray.forEach(({ id, title, documents }) => {
			const $li = document.createElement('li');

			$li.setAttribute('data-id', id);
			$li.innerHTML = `
				<span>${title ? title : EMPTY_TITLE}<span><button>+</button>
			`;

			if (documents.length) this.stateRecursion(documents, $li);
			$ul.appendChild($li);
		});
		$parentElement.appendChild($ul);
	};

	this.render = () => {
		const $fragment = document.createDocumentFragment();

		this.stateRecursion(this.state, $fragment);
		$divListContainer.appendChild($fragment);
	};
	this.render();

	$divListContainer.addEventListener('click', (event) => {
		const { target } = event;

		if (target.tagName !== 'SPAN') return;

		const { id } = target.closest('li').dataset;
		onTitleClick(id);
	});

	$divCreateNewDocument.addEventListener('click', (event) => {
		const { target } = event;
		if (target.tagName !== 'SPAN') return;
		onCreatePage();
	});
}