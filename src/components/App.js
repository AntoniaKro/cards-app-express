import { CardList } from './CardList';
import { FormSubmit } from './FormSubmit';
import { FormEdit } from './FormEdit';
import { get } from '../_utils';

export class App {
  constructor() {
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.loadCards();
    new FormSubmit(this.handleSubmit);
  }

  loadCards() {
    fetch('/cards')
      .then(res => res.json())
      .then(data => new CardList(data, this.handleDelete, this.handleEdit))
      .catch(err => console.log(err));
  }

  handleSubmit() {
    event.preventDefault();
    const form = get('.formSubmit');
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
    event.preventDefault();
    this.id = event.target.previousSibling.previousSibling.innerHTML;
    fetch('/cards' + `/${this.id}`)
      .then(res => res.json())
      .then(data => {
        const editForm = new FormEdit(this.saveEdit);
        const editFormChildList = editForm.el.childNodes;
        const title = editFormChildList[0];
        //const cat = get(`[value=${data.category}]`);
        const desc = editFormChildList[4];
        //cat.selected = true;
        title.setAttribute('value', data.title);
        desc.innerHTML = data.description;
      })
      .catch(err => console.log(err));
  }

  saveEdit(event) {
    event.preventDefault();
    const editForm = get('.formEdit');
    const editFormChildList = editForm.childNodes;
    fetch('/cards' + `/${this.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: editFormChildList[0].value,
        category: editFormChildList[2].value,
        description: editFormChildList[4].value,
        id: this.id
      })
    })
      .then(res => res.json())
      .then(data => {
        const cardContainer = get('.card-container');
        cardContainer.innerHTML = '';
        new CardList(data, this.handleDelete, this.handleEdit);
        editForm.remove();
      })
      .catch(err => console.log(err));
  }
}
