import { get } from '../_utils';

export class Card {
  constructor(title, category, description, id) {
    this.cardContainer = get('.card-container');
    this.el = document.createElement('div');
    this.el.innerHTML = `<p>${title}</p> <p>${category}</p><p>${description}</p><p hidden>${id}</p><button class='delete'>&#9249;</button>`;
    this.el.className = 'card';
    this.cardContainer.insertAdjacentElement('beforeend', this.el);
  }
}
