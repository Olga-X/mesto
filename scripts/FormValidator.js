class FormValidator {
  constructor(config, formSelector) {
    this._form = formSelector;
    this._input = config.inputSelector;
    this._button = config.submitButtonSelector;
    this._inactiveButton = config.inactiveButtonClass;
    this._inputError = config.inputErrorClass;
    this._error = config.errorClass;
    this._inputs = Array.from(formSelector.querySelectorAll(config.inputSelector));
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
    evt.preventDefault()
  });
    this._setEventListeners();
  };
  
  _showInputError(input, errorMessage) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._error);
    input.classList.add(this._inputError);
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
    this._buttonElement = this._inputs.forEach((input) => {
        input.addEventListener("input", () => {
          this._checkInputValidity(input);
          this._toggleButtonState();
        });
    });
  };
  
  // Функция, меняющая состояние кнопки сабмита. 
  _toggleButtonState() {
    if (!this._form.checkValidity()) {
      this._buttonElement.classList.add(this._inactiveButton);
      this._buttonElement.setAttribute("disabled", true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButton);
      this._buttonElement.removeAttribute("disabled");
    }
}
  
    // при открытии попапов очисткa ошибок (в index.js )
  clearErrorsOnOpening() {
    this._toggleButtonState();
    this._inputs.forEach((input) => {
      this._hideInputError(input)
    });
  }

  
}
export {FormValidator};