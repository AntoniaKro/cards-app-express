import { getAll } from '../_utils';
import { Card } from './Card';

export class CardList {
  constructor(cards, onDelete, onEdit) {
    this.cards = cards;
    this.renderCards();
    this.onDelete = onDelete;
    this.onEdit = onEdit;
    this.btn = getAll('.delete');
    this.btn.forEach(btn => btn.addEventListener('click', this.onDelete));
    this.edit = getAll('.fa-edit');
    this.edit.forEach(edit => edit.addEventListener('click', this.onEdit));
  }

  renderCards() {
    this.cards.forEach(card => {
      new Card(card.title, card.category, card.description, card.id);
    });
  }
}
