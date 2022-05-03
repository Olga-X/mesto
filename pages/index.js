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



// Форма добавления карточки
const cardAddBtn = document.querySelector('.profile__button-add');
const cardAddName = cardPopup.querySelector('.form__input_type_title');
const cardAddLink = cardPopup.querySelector('.form__input_type_link');
const cardCloseBtn = cardPopup.querySelector('.popup__close');
const cardAddForm = cardPopup.querySelector('.form');

// Форма подробного просмотра картинки
const imageCloseBtn = imagePopup.querySelector('.popup__close');
const imageReview = imagePopup.querySelector('.popup__image');
const imageReviewDesc = imagePopup.querySelector('.popup__description');

const cardsContainer = document.querySelector('.еlements__container');
const cardTemplate= document.querySelector('#card-template');

const overlays = Array.from(document.querySelectorAll(".popup"));

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

// Добавляем карточки в html
function render(){
  const cards=initialCards.map(createCard);
  cardsContainer.prepend(...cards);
}

function createCard(cardСontent) {
  cardElement = cardTemplate.content.cloneNode(true);
  const cardElementImage = cardElement.querySelector('.еlement__image');
  const cardElementName = cardElement.querySelector('.еlement__title');
  const cardElementBtn = cardElement.querySelector('.element__btn-trash');
  const cardElementLike = cardElement.querySelector('.еlement__like');

// Cвязи между объектами массива
  cardElementImage.src = cardСontent.link;
  cardElementName.textContent = cardСontent.name;
  cardElementImage.alt = cardСontent.name;

// Функция лайка 
  cardElementLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('еlement__like_active');
  });

// Функция удаления карточки 
  cardElementBtn.addEventListener('click', (evt) => {
  const element = evt.target.closest('.еlement');
  element.remove();
});

cardElementImage.addEventListener('click', () => {
  handleShowImage(cardСontent);
});

  return cardElement;
}

// Функция открытия
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", closeByEsc);
}

// Функция закрытия
function closePopup(popup) {
  popup.classList.remove('popup_opened'); 
  document.removeEventListener("keydown", closeByEsc);
}

// Открывает-закрывает кнопка добавления карточки
  cardAddBtn.addEventListener('click', () => {
    openPopup(cardPopup);
});

  cardCloseBtn.addEventListener('click', () => {
  closePopup(cardPopup);
});

// Функция открытия-закрытия окна подробного просмотра нажатием на картинку
function handleShowImage(popupShownContent) {
  
  imageReviewDesc.textContent = popupShownContent.name;
  imageReview.alt = popupShownContent.name;
  imageReview.src = popupShownContent.link;
  openPopup(imagePopup);
}

imageCloseBtn.addEventListener('click', () => {
  closePopup(imagePopup);
});

// Открывает-закрывает профиль
profileEditBtn.addEventListener('click', () => {
  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileDescription.textContent;
  
  disableButtonOnOpening(profileForm, config);
  hideInputError(profileForm, profileNameInput, config);
  hideInputError(profileForm, profileAboutInput, config);
  openPopup(profilePopup);
});

profileCloseBtn.addEventListener('click', () => {
  closePopup(profilePopup);
});

// Закрытие кнопкой esc
function closeByEsc(evt) {
  if (evt.key === "Escape") {
      closePopup(document.querySelector(".popup_opened"));
  }
}

// Закрытие кликом оверлей

overlays.forEach((overlay) => {
  overlay.addEventListener("click", (evt) => {
      if (evt.target === evt.currentTarget) {
          closePopup(document.querySelector(".popup_opened"));
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


// Обработчик «отправки» формы добавления карточки
cardAddForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  addCardTop({
    name: cardAddName.value,
    link: cardAddLink.value
  }, cardsContainer, true);

  closePopup(cardPopup);
  cardAddForm.reset();
});

// Функция добавление новой карточки в начало списка
function addCardTop(cardСontent, cardPopup) {
  const card = createCard(cardСontent);
    cardPopup.prepend(card);
}

render();