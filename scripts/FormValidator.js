const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};

class FormValidator {
  constructor(config, formSelector) {
    this._form = formSelector;
    this._button = config.submitButtonSelector;
    this._inactiveButton = config.inactiveButtonClass;
    this._inputError = config.inputErrorClass;
    this._input = config.inputSelector;
    this._error = config.errorClass;
  }

  
  _showInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputError);
    errorElement.textContent = input.errorMessage;
    errorElement.classList.add(this._error);
  }
  
 _hideInputError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputError);
    errorElement.textContent = "";
    errorElement.classList.remove(this._error);
  }
  
  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }
  
  _setEventListeners(form, config) {
    const inputs = Array.from(this._form.querySelectorAll(this._input));
    this._toggleButtonState();
    inputs.forEach((input) => {
        input.addEventListener("input", () => {
          this._checkInputValidity(input);
            this._toggleButtonState();
        });
    });
  };
  
  // Функция, меняющая состояние кнопки сабмита. 
  _toggleButtonState() {
    if (!this._form.checkValidity()) {
        this._form
            .querySelector(this._button)
            .classList.add(this._inactiveButton);
        this._form.querySelector(this._button).setAttribute("disabled", true);
    } else {
        this._form
            .querySelector(this._button)
            .classList.remove(this._inactiveButton);
        this._form.querySelector(this._button).removeAttribute("disabled", true);
    }
}
  
  enableValidation() {
      this._form.addEventListener("submit", (evt) => 
      evt.preventDefault());
      this._setEventListeners();
    };
    // при открытии попапов в index.js очисткa ошибок

    clearErrorsOnOpening(input) {
      const errorElement = this._form.querySelector(`.${input.id}-error`);
      input.classList.remove(this._inputError);
      errorElement.textContent = "";
      errorElement.classList.remove(this._error);
  }
  // при открытии попапов в index.js сброса состояния кнопки
disableButtonOnOpening() {
  this._form.querySelector(this._button).setAttribute("disabled", true);
}
  
}
export { FormValidator, config };