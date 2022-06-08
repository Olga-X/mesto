
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import Popup from "../scripts/components/Popup.js";
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from "../scripts/components/UserInfo.js";
import {config, 
  initialCards, 
  profileForm,
  cardAddForm,
  profileNameInput,
  profileAboutInput,
 } from "../utils/constants.js";

// Модальные окна попапы
//const profilePopup = document.querySelector('.popup_form_edit-profile');
//const cardPopup = document.querySelector('.popup_form_add-card');
//const imagePopup = document.querySelector('.popup_review-image');

// Форма добавления профиля
const profileEditBtn = document.querySelector('.profile__button-edit');
//const profileCloseBtn = document.querySelector('.popup__close');
//const profileName = document.querySelector('.profile__title');
//const profileDescription = document.querySelector('.profile__text');
//const profileForm = document.querySelector('#editPopupForm');
//const profileNameInput = document.querySelector('.form__input_type_name');
//const profileAboutInput = document.querySelector('.form__input_type_about');
//const submitProfileBtn = profileForm.querySelector('.form__submit');

// Форма добавления карточки
const cardAddBtn = document.querySelector('.profile__button-add');
//const cardAddName = document.querySelector('.form__input_type_title');
//const cardAddLink = document.querySelector('.form__input_type_link');
//const cardCloseBtn = document.querySelector('.popup__close');
//const cardAddForm = document.querySelector('#cardPopupForm');
//const submitCardBtn = cardAddForm.querySelector('.form__submit');

// Форма подробного просмотра картинки
//const imageCloseBtn = document.querySelector('.popup__close');
//const imageReview = imagePopup.querySelector('.popup__image');
//const imageReviewDesc = imagePopup.querySelector('.popup__description');

//const cardsContainer = document.querySelector('.еlements__container');
//const cardTemplate = document.querySelector('#card-template');

//const overlays = document.querySelectorAll('.popup');

// валидация
const validationProfileForm = new FormValidator(config, profileForm);
validationProfileForm.enableValidation();
const validationCardAddForm = new FormValidator(config, cardAddForm);
validationCardAddForm.enableValidation();

// Функция создания карточки рабочий
function createCard(item) {
  const card = new Card(item, "#card-template", () => {
    imagePopup.open(item);
  });
  const cardElement = card.generateCard();
  return cardElement;
}

// Отрисовка карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  },
}, '.еlements__container',);
cardList.renderItems();

// Класс для открытия попапа картинки
const imagePopup  = new PopupWithImage({
  popupSelector: '.popup_review-image',
});
imagePopup.setEventListeners();


// Класс формы и создания картинки 
const cardPopup = new PopupWithForm({
  popupSelector: '.popup_form_add-card', 
  formSelector: 'formCard',
  handleFormSubmit: (data) => {
  const newCardElemnt = createCard(data)
  cardList.addItem(newCardElemnt);
  cardPopup.close()
},
}); 

cardPopup.setEventListeners();


// редактирование профиля

const userInfo = new UserInfo({
  nameSelector: ".profile__title", 
  aboutSelector: ".profile__text"
});

const profilePopup = new PopupWithForm({
  popupSelector: ".popup_form_edit-profile",
  formSelector: 'nameProfile',
  handleFormSubmit: (data) => {
  userInfo.setUserInfo(data);
  profilePopup.close();
  }
});

profilePopup.setEventListeners();

// СЛУШАТЕЛИ

// Открывает-закрывает профиль
profileEditBtn.addEventListener('click', () => {
  profilePopup.open();
 const presentInfo = userInfo.getUserInfo();
  profileNameInput.value = presentInfo.name;
  profileAboutInput.value = presentInfo.about;

  validationProfileForm.clearErrorsOnOpening();
});
  
//открыть попап карточки
cardAddBtn.addEventListener("click", () => {
  cardPopup.open();
  validationCardAddForm.clearErrorsOnOpening();
});