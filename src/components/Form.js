import { createElement, get } from '../_utils';

export class Form {
  constructor(onClick) {
    this.el = createElement({
      type: 'form',
      className: 'form',
      innerHTML: `<input type='text' placeholder='title' id='title'></input>
                        <input type='select' placeholder='category' id='category'></input>
                        <textarea placeholder='description' id='description'></textarea>
                        <button class='submit'>SAVE</button>`
    });
    this.onClick = onClick;
    this.btn = get('.submit');
    this.btn.addEventListener('click', this.onClick);
  }
}
