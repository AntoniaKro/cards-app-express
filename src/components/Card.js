import { get } from '../_utils';

export class Card {
  constructor(title, category, description, id) {
    this.cardContainer = get('.card-container');
    this.el = document.createElement('div');
    this.el.innerHTML = `<p>${title}</p> <p>${category}</p><p>${description}</p><p hidden>${id}</p><i class="far fa-trash-alt delete"></i><i class="far fa-edit"></i>`;
    this.el.className = 'card';
    this.cardContainer.insertAdjacentElement('beforeend', this.el);
  }
}
