import { CardList } from './CardList';
import { Form } from './Form';
import { get } from '../_utils';

export class App {
  constructor() {
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadCards();
    new Form(this.handleSubmit);
  }

  loadCards() {
    fetch('/cards')
      .then(res => res.json())
      .then(data => new CardList(data, this.handleDelete))
      .catch(err => console.log(err));
  }

  handleSubmit() {
    event.preventDefault();
    const form = get('form');
    const title = get('#title');
    const cat = get('#category');
    const desc = get('#description');
    fetch('/cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.value,
        category: cat.value,
        description: desc.value
      })
    })
      .then(res => res.json())
      .then(data => {
        const cardContainer = get('.card-container');
        cardContainer.innerHTML = '';
        new CardList(data, this.handleDelete);
      })
      .catch(err => console.log(err));
    form.reset();
  }

  handleDelete(event) {
    const id = event.target.previousSibling.innerHTML;
    fetch('/cards' + `/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        const cardContainer = get('.card-container');
        cardContainer.innerHTML = '';
        new CardList(data, this.handleDelete);
      })
      .catch(err => console.log(err));
  }
}
