import { createElement, get } from '../_utils';

export class Form {
  constructor(onClick) {
    this.el = createElement({
      type: 'form',
      className: 'form',
      innerHTML: `<input type='text' placeholder='title' id='title' class='formElement'></input>
                        <input type='select' placeholder='category' id='category' class='formElement'></input>
                        <textarea placeholder='description' id='description' class='formElement'></textarea>
                        <button class='submit formElement'>SAVE</button>`
    });
    this.onClick = onClick;
    this.btn = get('.submit');
    this.btn.addEventListener('click', this.onClick);
  }
}
