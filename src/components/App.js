import { CardList } from './CardList';
import { Form } from './Form';
import { get } from '../_utils';

export class App {
  constructor() {
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.loadCards();
    new Form(this.handleSubmit, 'formSubmit');
  }

  loadCards() {
    fetch('/cards')
      .then(res => res.json())
      .then(data => new CardList(data, this.handleDelete, this.handleEdit))
      .catch(err => console.log(err));
  }

  handleSubmit() {
    event.preventDefault();
    const form = get('formSubmit');
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
        new CardList(data, this.handleDelete, this.handleEdit);
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
        new CardList(data, this.handleDelete, this.handleEdit);
      })
      .catch(err => console.log(err));
  }

  handleEdit() {
    const id = event.target.previousSibling.previousSibling.innerHTML;
    fetch('/cards' + `/${id}`)
      .then(res => res.json())
      .then(data => {
        const editForm = new Form(this.saveEdit, 'formEdit');
        const editFormChildList = editForm.el.childNodes;
        editFormChildList[2].value = data.category;
        editFormChildList[1].value = data.title;
        editFormChildList[3].value = data.description;
      })
      .catch(err => console.log(err));
  }

  saveEdit() {
    event.preventDefault();
    const form = get('formEdit');
    const title = get('#title');
    const cat = get('#category');
    const desc = get('#description');
    fetch('/cards', {
      method: 'PATCH',
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
        new CardList(data, this.handleDelete, this.handleEdit);
      })
      .catch(err => console.log(err));
  }
}
