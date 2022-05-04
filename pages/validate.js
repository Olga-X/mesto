const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};

const forms = Array.from(document.querySelectorAll(config.formSelector));

function showInputError(form, input, errorMessage, config) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

function hideInputError(form, input, config) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

function checkInputValidity(form, input, config) {
  if (!input.validity.valid) {
      showInputError(form, input, input.validationMessage, config);
  } else {
      hideInputError(form, input, config);
  }
}

function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  toggleButtonState(form, config, button);
  inputs.forEach((input) => {
      input.addEventListener("input", () => {
          checkInputValidity(form, input, config);
          toggleButtonState(form, config, button);
      });
  });
};

// Функция, меняющая состояние кнопки сабмита. 
function toggleButtonState(form, config, button) {
if (form.checkValidity()) {
  button.removeAttribute('disabled');
  button.classList.remove(config.inactiveButtonClass);
  return;
}
if (!form.checkValidity()) {
  button.setAttribute('disabled', true);
  button.classList.add(config.inactiveButtonClass);
  return;
}
};

function enableValidation(config) {
  forms.forEach((form) => {
      form.addEventListener("submit", (evt) => {
          evt.preventDefault();
      });
      setEventListeners(form, config);
  });
}

enableValidation(config);