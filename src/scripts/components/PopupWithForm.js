import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._popup = document.querySelector(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
      this._inputs = this._popup.querySelectorAll('.form__input');
      this._formValues = {};
        this._inputs.forEach(input => {
          this._formValues[input.name] = input.value
        });
        return this._formValues;
    }

    open() {
      super.open();
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
      this._form = this._popup.querySelector('.form');
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
        super.setEventListeners();
    }
}