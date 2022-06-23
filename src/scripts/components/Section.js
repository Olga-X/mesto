export default class Section {
  constructor(renderer , containerSelector)  {
   //this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.reverse().map(item => {
      return this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}