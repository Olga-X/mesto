class FormValidator {
  constructor(config, formSelector) {
    this._form = formSelector;
    this._input = config.inputSelector;
    this._button = config.submitButtonSelector;
    this._inactiveButton = config.inactiveButtonClass;
    this._inputError = config.inputErrorClass;
    this._error = config.errorClass;
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
    evt.preventDefault()
  });
    this._setEventListeners();
  };
  
  _showInputError(input, errorMessage) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputError);
    errorElement.textContent = errorMessage;
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
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }
  
  _setEventListeners() {
    this._toggleButtonState();
    const inputs = Array.from(this._form.querySelectorAll(this._input));
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
  
    // при открытии попапов очисткa ошибок (в index.js )
  clearErrorsOnOpening(input) {
      const errorElement = this._form.querySelector(`.${input.id}-error`);
      input.classList.remove(this._inputError);
      errorElement.textContent = "";
      errorElement.classList.remove(this._error);
  }
  // при открытии попапов сброса состояния кнопки (в index.js )
  disableButtonOnOpening() {
  this._form.querySelector(this._button).setAttribute("disabled", true);
}
  
}
export {FormValidator};