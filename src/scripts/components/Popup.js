export default class Popup {
  constructor({popupSelector}) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => 
      this._handleEscClose(evt)
    );
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
     
  }

  _handleEscClose(evt) {
      if (evt.key === 'Escape') {
          this.close();
      }
  }

  _handleOverlayClose(event) {
    if (event.target === event.currentTarget) {
        this.close();
    }
}

  setEventListeners() {
    this._popup
    .querySelector('.popup__close')
    .addEventListener('click', () => {this.close();});

    this._popup
    .addEventListener('mousedown', (event) => this._handleOverlayClose(event));
    
  }
}