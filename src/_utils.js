export function createElement({
  type = 'div',
  className = '',
  innerHTML = ''
}) {
  const el = document.createElement(type);
  el.className = className;
  el.innerHTML = innerHTML;
  document.body.appendChild(el);
  return el;
}

export function get(sel) {
  return document.body.querySelector(sel);
}

export function getAll(sel) {
  return document.body.querySelectorAll(sel);
}
