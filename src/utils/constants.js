export const initialCards = [
  {
    name: 'Геленджик',
    link: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/rueJ/hVBCd5ccm'
  },
  {
    name: 'Анапа',
    link: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/uN9U/21yT68VsS'
  },
  {
    name: 'Крым',
    link: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/SPhV/zdjrK3vH9'
  },
  {
    name: 'Москва',
    link: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/Ckpk/ieGn5aApg'
  },
  {
    name: 'Сочи',
    link: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/JCis/xMUfG5bza'
  },
  {
    name: 'Сукко',
    link: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/VcEe/1pKAcJ1fK'
  }
]; 

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

export const cardsContainer = document.querySelector('.еlements__container');
export const cardTemplate = document.querySelector('#card-template');