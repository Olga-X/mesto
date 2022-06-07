
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
  cardAddName,
  cardAddLink,
  cardsContainer,
  cardTemplate, 
  cardAddBtn,
  profileEditBtn} from "../utils/constants.js";

// Модальные окна попапы
//const profilePopup = document.querySelector('.popup_form_edit-profile');
//const cardPopup = document.querySelector('.popup_form_add-card');
//const imagePopup = document.querySelector('.popup_review-image');

// Форма добавления профиля
//const profileEditBtn = document.querySelector('.profile__button-edit');
//const profileCloseBtn = document.querySelector('.popup__close');
//const profileName = document.querySelector('.profile__title');
//const profileDescription = document.querySelector('.profile__text');
//const profileForm = document.querySelector('#editPopupForm');
//const profileNameInput = document.querySelector('.form__input_type_name');
//const profileAboutInput = document.querySelector('.form__input_type_about');
//const submitProfileBtn = profileForm.querySelector('.form__submit');

// Форма добавления карточки
//const cardAddBtn = document.querySelector('.profile__button-add');
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

cardAddBtn.addEventListener("click", () => {
  // сброс валидации 
  validationCardAddForm.clearErrorsOnOpening();
  popupCard.open();
});


// Класс для открытия попапа картинки
const popupImage  = new PopupWithImage({
  popupSelector: '.popup_review-image',
  imageReviewDesc: '.popup__image"',
  imageReview: '.popup__description'
});

/*/function handleCardClick(name, link) {
  popupImage.open(name, link);
}/*/

// Отрисовка карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, "#card-template", () => {
      popupImage.open(item);
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, '.еlements__container',);
cardList.renderItems();

// Класс формы и создания картинки
const popupCard= new PopupWithForm({
  popupSelector: '.popup_form_add-card', 
  handleFormSubmit: (item) => {
  const newCard = createCard(item)
  cardList.addItem(newCard);
},
});

//открыть попап профиль
profileEditBtn.addEventListener("click", () => {
 userInfo.getUserInfo(profileNameInput,profileAboutInput);
// сброс валидации
validationProfileForm.clearErrorsOnOpening();
profilePopup.open();
});

// редактирование профиля

const userInfo = new UserInfo({
  nameSelector: ".profile__title", 
  aboutSelector: ".profile__text"
});

const profilePopup = new PopupWithForm({
  popupSelector: ".popup_form_edit-profile", 
  formSelector: "formProfile",
  handleFormSubmit: (data) => {
  userInfo.setUserInfo(data);
  }
});

// СЛУШАТЕЛИ СОБЫТИЙ
popupCard.setEventListeners();
profilePopup.setEventListeners();
popupImage.setEventListeners();

// валидация
const validationProfileForm = new FormValidator(config, profileForm);
validationProfileForm.enableValidation();
const validationCardAddForm = new FormValidator(config, cardAddForm);
validationCardAddForm.enableValidation();

/*/ const generateCard = (card) => new Card(card, '#card-template').generate();

const renderCards = (cards) => (
  cards.forEach((card) => cardsContainer.append(generateCard(card)))
);

const addCardTop = () => {
  const newCard = generateCard({
    name: cardAddName.value,
    link: cardAddLink.value
  }, '#card-template');

  cardsContainer.prepend(newCard);
};

cardAddForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  addCardTop(); 

  cardPopup.close();
cardAddForm.reset();
});

// Открывает-закрывает кнопка добавления карточки
cardAddBtn.addEventListener('click', () => {
  cardPopup.open();
  validationCardAddForm.clearErrorsOnOpening();
});

 //cardCloseBtn.addEventListener('click', () => {cardPopup.close()});

//закрытиу окна подробного просмотра нажатием на картинку

 //imageCloseBtn.addEventListener('click', () => {imagePopup.close()});


// Открывает-закрывает профиль
profileEditBtn.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileDescription.textContent;
  profilePopup.open();
  validationProfileForm.clearErrorsOnOpening();
});

 profileCloseBtn.addEventListener('click', () => {profilePopup.close()});

 Закрытие кликом оверлей
overlays.forEach((overlay) => {
  overlay.addEventListener("click", (evt) => {
if (evt.target === evt.currentTarget) {
  overlay.close();
    }
  });
}); 

// Обработчик «отправки» формы для изменения профиля
function profileEditSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileAboutInput.value;
  profilePopup.close();
}

// Обработчик к форме он будет следить за событием “submit” - «отправка»
profileForm.addEventListener('submit', profileEditSubmit);

//renderCards(initialCards);/*/