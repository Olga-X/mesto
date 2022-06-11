import "./pages/index.css"
import Card from '../src/scripts/components/Card.js';
import FormValidator from '../src/scripts/components/FormValidator.js';
import Section from '../src/scripts/components/Section.js';
import PopupWithImage from '../src/scripts/components/PopupWithImage.js';
import PopupWithForm from '../src/scripts/components/PopupWithForm.js';
import UserInfo from "../src/scripts/components/UserInfo.js";
import {config, 
  initialCards, 
  profileForm,
  cardAddForm,
  profileNameInput,
  profileAboutInput,
 } from "../src/utils/constants.js";

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
function createCard(data) {
  const card = new Card(data,  "#card-template", () => {
    imagePopup.open(data);
  }).generateCard();
  return card
} 

// Отрисовка карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item ));
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

// Слушатели
imagePopup.setEventListeners();
profilePopup.setEventListeners();
cardPopup.setEventListeners();

// Открывает-закрывает профиль
profileEditBtn.addEventListener('click', () => {
 userInfo.getUserInfo(profileNameInput, profileAboutInput);
  validationProfileForm.clearErrorsOnOpening();
  profilePopup.open();
});
  
//Открыть попап карточки
cardAddBtn.addEventListener("click", () => {
  cardPopup.open();
  validationCardAddForm.clearErrorsOnOpening();
});