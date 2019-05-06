import { getAll, get } from '../_utils';
import { Card } from './Card';

export class CardList {
  cardContainer = get('.card-container');
  constructor(cards, onDelete, onEdit) {
    this.renderCards(cards);
    this.onDelete = onDelete;
    this.onEdit = onEdit;
  }

  renderCards(cards) {
    this.cardContainer.innerHTML = '';
    cards.forEach(card => {
      new Card(card.title, card.category, card.description, card._id);
      this.btn = getAll('.delete');
      this.btn.forEach(btn => btn.addEventListener('click', this.onDelete));
      this.edit = getAll('.fa-edit');
      this.edit.forEach(edit => edit.addEventListener('click', this.onEdit));
    });
  }
}
