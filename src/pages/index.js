import "../pages/index.css"
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
//import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';
import UserInfo from "../scripts/components/UserInfo.js";
import Api from '../scripts/components/Api.js';
import {config, 
  initialCards, 
  profileForm,
  cardAddForm,
  profileFormAvatar,
  profileNameInput,
  profileAboutInput,
 } from "../utils/constants";

const profileEditBtn = document.querySelector('.profile__button-edit');
const cardAddBtn = document.querySelector('.profile__button-add');
const avatarAddBtn = document.querySelector(".profile__avatar-btn");

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-43/',
  headers: {
    authorization: 'fd597ad8-95e3-4b9d-9691-61d858c2f79f',
    'Content-Type': 'application/json',
  },
});

// валидация
const validationProfileForm = new FormValidator(config, profileForm);
validationProfileForm.enableValidation();
const validationCardAddForm = new FormValidator(config, cardAddForm);
validationCardAddForm.enableValidation();
//const validationProfileAvatar = new FormValidator(config, profileFormAvatar);
validationProfileAvatar.enableValidation();

// Класс для открытия попапа картинки
const imagePopup  = new PopupWithImage({
  popupSelector: '.pop up_review-image',
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
    cardList.appendCard(createCard(item ));
  },
}, '.еlements__container');
cardList.renderItems();

// Класс создания картинки и формы 
const cardPopup = new PopupWithForm({
  popupSelector: '.popup_form_add-card', 
  handleFormSubmit: (item) => {
  cardList.prependCard(createCard(item));
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

const popupAvatar = new PopupWithForm({
  popupSelector: ".popup_avatar", 
  handleFormSubmit: (data) => {
    api
      .addAvatar(data.link)
      .then((data) => {
        controlUserInfo.setAvatar(data.avatar);
      })
      .catch((err) => {
        console.log(err);
      });
    popupAvatar.close();
  },
});

// попап delete
const popupDelete = new PopupWithConfirmation({
  popupSelector: ".popup_delete",
});

// Слушатели
imagePopup.setEventListeners();
profilePopup.setEventListeners();
cardPopup.setEventListeners();

// Открывает-закрывает профиль
profileEditBtn.addEventListener('click', () => {
  const currentInfo = userInfo.getUserInfo();
  profileNameInput.value = currentInfo.name;
  profileAboutInput.value = currentInfo.about;
  validationProfileForm.clearErrorsOnOpening();
  profilePopup.open();
});
  
//Открыть попап карточки
cardAddBtn.addEventListener("click", () => {
  cardPopup.open();
  validationCardAddForm.clearErrorsOnOpening();
});
//Открыть попап аватар
avatarAddBtn.addEventListener("click", () => {
  popupAvatar.open();
  validationProfileAvatar.clearErrorsOnOpening();
});