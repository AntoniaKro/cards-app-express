import { getAll } from '../_utils';
import { Card } from './Card';

export class CardList {
  constructor(cards, onDelete, onEdit) {
    this.renderCards(cards);
    this.onDelete = onDelete;
    this.onEdit = onEdit;
  }

  renderCards(cards) {
    cards.forEach(card => {
      new Card(card.title, card.category, card.description, card._id);
      this.btn = getAll('.delete');
      this.btn.forEach(btn => btn.addEventListener('click', this.onDelete));
      this.edit = getAll('.fa-edit');
      this.edit.forEach(edit => edit.addEventListener('click', this.onEdit));
    });
  }
}
