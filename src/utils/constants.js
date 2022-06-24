export const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};

export const profileForm = document.querySelector('#editPopupForm');
export const profileNameInput = document.querySelector('.form__input_type_name');
export const profileAboutInput = document.querySelector('.form__input_type_about');

export const cardAddForm = document.querySelector('#cardPopupForm');
export const cardAddName = document.querySelector('.form__input_type_title');
export const cardAddLink = document.querySelector('.form__input_type_link');

export const profileFormAvatar = document.querySelector('#editAvatarForm');

export const cardsContainer = document.querySelector('.еlements__container');
export const cardTemplate = document.querySelector('#card-template');
export const avatar = document.querySelector('.profile__avatar');