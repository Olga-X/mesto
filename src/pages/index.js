
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
  
  cardAddLink,
  cardAddName
 } from "../utils/constants.js";

const profileEditBtn = document.querySelector('.profile__button-edit');
const cardAddBtn = document.querySelector('.profile__button-add');

// валидация
const validationProfileForm = new FormValidator(config, profileForm);
validationProfileForm.enableValidation();
const validationCardAddForm = new FormValidator(config, cardAddForm);
validationCardAddForm.enableValidation();

// Класс для открытия попапа картинки
const imagePopup  = new PopupWithImage({
  popupSelector: '.popup_review-image',
});

// Функция создания карточки
function createCard(item) {
  const card = new Card(item,  "#card-template", () => {
    imagePopup.open(item);
  }).generateCard();
  return card
} 


// Отрисовка карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  },
}, '.еlements__container');
cardList.renderItems();


// Класс создания картинки и формы 
const cardPopup = new PopupWithForm({
  popupSelector: '.popup_form_add-card', 
  handleFormSubmit: (item) => {
  cardList.addNewCard(createCard(item));
  cardPopup.close();
},
}); 

// Редактирование профиля
const profilePopup = new PopupWithForm({
  popupSelector: ".popup_form_edit-profile", 
  handleFormSubmit: (data) => {
  userInfo.setUserInfo(data["nameProfile"], data["aboutMe"]);
  profilePopup.close();
  }
});


const userInfo = new UserInfo({
  nameSelector: ".profile__title", 
  aboutSelector: ".profile__text"
});

// СЛУШАТЕЛИ
imagePopup.setEventListeners();
profilePopup.setEventListeners();
cardPopup.setEventListeners();


// Открывает-закрывает профиль
profileEditBtn.addEventListener('click', () => {
 userInfo.getUserInfo(profileNameInput, profileAboutInput);
  validationProfileForm.clearErrorsOnOpening();
  profilePopup.open();
});
  
//открыть попап карточки
cardAddBtn.addEventListener("click", () => {
  cardPopup.open();
  validationCardAddForm.clearErrorsOnOpening();
});