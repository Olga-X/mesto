import {openPopup, closePopup} from './utils.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

// Модальные окна попапы
const profilePopup = document.querySelector('.popup_form_edit-profile');
const cardPopup = document.querySelector('.popup_form_add-card');
const imagePopup = document.querySelector('.popup_review-image');

// Форма добавления профиля
const profileEditBtn = document.querySelector('.profile__button-edit');
const profileCloseBtn = profilePopup.querySelector('.popup__close');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__text');
const profileForm = profilePopup.querySelector('.form');
const profileNameInput = profilePopup.querySelector('.form__input_type_name');
const profileAboutInput = profilePopup.querySelector('.form__input_type_about');
//const submitProfileBtn = profileForm.querySelector('.form__submit');

// Форма добавления карточки
const cardAddBtn = document.querySelector('.profile__button-add');
const cardAddName = cardPopup.querySelector('.form__input_type_title');
const cardAddLink = cardPopup.querySelector('.form__input_type_link');
const cardCloseBtn = cardPopup.querySelector('.popup__close');
const cardAddForm = cardPopup.querySelector('.form');
//const submitCardBtn = cardAddForm.querySelector('.form__submit');

// Форма подробного просмотра картинки
const imageCloseBtn = imagePopup.querySelector('.popup__close');
//const imageReview = imagePopup.querySelector('.popup__image');
//const imageReviewDesc = imagePopup.querySelector('.popup__description');

const cardsContainer = document.querySelector('.еlements__container');
//const cardTemplate = document.querySelector('#card-template');

const overlays = document.querySelectorAll('.popup');

const initialCards = [
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

const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};

// валидация

const validationProfileForm = new FormValidator(config, profileForm);
const validationCardAddForm = new FormValidator(config, cardAddForm);

validationProfileForm.enableValidation();
validationCardAddForm.enableValidation();

// добавление карточек на страницу

const generateCard = (card) => new Card(card, '#card-template').generate();

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

  closePopup(cardPopup);
cardAddForm.reset();
});

// Открывает-закрывает кнопка добавления карточки
cardAddBtn.addEventListener('click', () => {
  validationCardAddForm.clearErrorsOnOpening();
  openPopup(cardPopup);
});

 cardCloseBtn.addEventListener('click', () => {closePopup(cardPopup)});

//закрытиe окна подробного просмотра нажатием на картинку

 imageCloseBtn.addEventListener('click', () => {closePopup(imagePopup)});

// Открывает-закрывает профиль
profileEditBtn.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileDescription.textContent;
  validationProfileForm.clearErrorsOnOpening();
  openPopup(profilePopup);
});

 profileCloseBtn.addEventListener('click', () => {closePopup(profilePopup)});

// Закрытие кликом оверлей
overlays.forEach((overlay) => {
  overlay.addEventListener("click", (evt) => {
if (evt.target === evt.currentTarget) {
  closePopup(overlay);
    }
  });
});

// Обработчик «отправки» формы для изменения профиля
function profileEditSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileAboutInput.value;
  closePopup(profilePopup);
}

// Обработчик к форме он будет следить за событием “submit” - «отправка»
profileForm.addEventListener('submit', profileEditSubmit);

renderCards(initialCards);