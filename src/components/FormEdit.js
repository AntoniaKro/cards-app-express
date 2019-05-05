import { createElement, get } from '../_utils';

export class FormEdit {
  constructor(onClick) {
    this.el = createElement({
      type: 'form',
      className: 'formEdit',
      innerHTML: `<input type='text' placeholder='Title' id='title' class='formElement'></input>
                        <select id='category' class='formElement'>
                          <option value="No Category">No category</option>
                          <option value="Shopping">Shopping</option>
                          <option value="Social">Social</option>
                          <option value="Bootcamp">Bootcamp</option>
                          <option value="Cooking">Cooking</option>
                          <option value="Miscellanous">Miscellanous</option>
                          </select>
                        <textarea placeholder='Description' id='description' class='formElement'></textarea>
                        <button class='edit formElement'>SAVE</button>`
    });
    this.onClick = onClick;
    this.btn = get('.edit');
    this.btn.addEventListener('click', this.onClick);
  }
}
