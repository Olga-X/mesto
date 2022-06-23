import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super({popupSelector});
        this._form = this._popup.querySelector('.form');
        this._inputs = this._popup.querySelectorAll('.form__input');
        this._handleFormSubmit = handleFormSubmit;
        this._btnElement = this._popup.querySelector('.form__submit');
    }
    _getInputValues() {
      this._formValues = {};
        this._inputs.forEach(input => {
          this._formValues[input.name] = input.value
        });
        return this._formValues;
    }


    setInputValues(data) {
      this._inputs.forEach((input) => {
        input.value = data[input.name]
      })
    }


    close() {
        super.close();
        this._form.reset();
    }
   
    setEventListeners() {
      super.setEventListeners();
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();           
            this._handleFormSubmit(this._getInputValues());
        });
    }

    renderBtnText(name) {
      this._btnElement.textContent = name
    }
}