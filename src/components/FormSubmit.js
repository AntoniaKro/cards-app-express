import { createElement, get } from '../_utils';

export class FormSubmit {
  constructor(onClick) {
    this.el = createElement({
      type: 'form',
      className: 'formSubmit',
      innerHTML: `<input type='text' placeholder='Title' id='title' class='formElement'></input>
                        <select id='category' class='formElement'>
                          <option value="">Choose category</option>
                          <option value="Shopping">Shopping</option>
                          <option value="Social Life">Social Life</option>
                          <option value="Bootcamp">Bootcamp</option>
                          <option value="Cooking">Cooking</option>
                          <option value="Miscellanous">Miscellanous</option>
                          </select>
                        <textarea placeholder='Description' id='description' class='formElement'></textarea>
                        <button class='submit formElement'>SAVE</button>`
    });
    this.onClick = onClick;
    this.btn = get('.submit');
    this.btn.addEventListener('click', this.onClick);
  }
}
