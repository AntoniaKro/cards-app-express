import { getAll } from '../_utils';
import { Card } from './Card';

export class CardList {
  constructor(cards, onClick) {
    this.cards = cards;
    this.renderCards();
    this.onClick = onClick;
    this.btn = getAll('.delete');
    this.btn.forEach(btn => btn.addEventListener('click', this.onClick));
  }

  renderCards() {
    this.cards.forEach(card => {
      new Card(card.title, card.category, card.description, card.id);
    });
  }
}
