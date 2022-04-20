const modalWindow = document.querySelector('.popup');
const modalCloseBtn = modalWindow.querySelector('.popup__close');
const modalEditBtn = document.querySelector('.profile__button-edit');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__text');
const profileForm = modalWindow.querySelector('.form');
const profileNameInput = modalWindow.querySelector('.form__input_type_name');
const profileAboutInput = modalWindow.querySelector('.form__input_type_about');

// Окно добавления карточки
const btnAddNewCard = document.querySelector('.profile__button-add');
const popupAddCard = document.querySelector('.popup_form_add-card');
const popupAddCardName = popupAddCard.querySelector('.form__input_type_title');
const popupAddCardLink = popupAddCard.querySelector('.form__input_type_link');
const popupAddCardClose = popupAddCard.querySelector('.popup__close');
const addCardForm = popupAddCard.querySelector('.form');

// Окно подробного просмотра картинки
const popupReview = document.querySelector('.popup_review-image');
const popupReviewClose = popupReview.querySelector('.popup__close');
const popupReviewImage = popupReview.querySelector('.popup__image');
const popupReviewDesc = popupReview.querySelector('.popup__description');

const elementList = document.querySelector('.еlements__container');
const cardTemplate= document.querySelector('#card-template');


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

function render(){
  const cards=initialCards.map(createCard);
  elementList.prepend(...cards);
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
  cardElementName.alt = cardСontent.name;

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

// Функция открытия-закрытия профиля
function toggleModalWindow() {
  modalWindow.classList.toggle('popup_opened');
}

// Функция открытия-закрытия кнопкой добавления карточки
function toggleAddCard() {
  popupAddCard.classList.toggle('popup_opened');
}

btnAddNewCard.addEventListener('click', toggleAddCard);

 // Функция открытия-закрытия картинки
 function togglePopupReview() {
  popupReview.classList.toggle('popup_opened');
}

// Функция открытия окна подробного просмотра нажатием на картинку
function handleShowImage(popupShownContent) {
  togglePopupReview();

  popupReviewDesc.textContent = popupShownContent.name;
  popupReviewImage.alt = popupShownContent.name;
  popupReviewImage.src = popupShownContent.link;
}

// Закрыть по клику на крестик
modalCloseBtn.addEventListener('click', toggleModalWindow);
popupAddCardClose.addEventListener('click', toggleAddCard);
popupReviewClose.addEventListener('click', togglePopupReview);

// Открыть редактировать по клик
modalEditBtn.addEventListener('click', function() {

  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileDescription.textContent;

  toggleModalWindow();
})

// Обработчик «отправки» формы для изменения профиля
function profileEditSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileAboutInput.value;

  toggleModalWindow();
}

// Обработчик «отправки» формы добавления карточки
popupAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();

  addInArr({
    name: popupAddCardName.value,
    link: popupAddCardLink.value
  }, elementList, true);

  toggleAddCard();
});

// Прикрепляем обработчик к форме он будет следить за событием “submit” - «отправка»
profileForm.addEventListener('submit', profileEditSubmit);

// Функция добавление новой карточки в начало списка
function addInArr(cardСontent, popupAddCard, newItem) {
  const item = createCard(cardСontent);

  if(newItem) {
    popupAddCard.prepend(item);
  }
}

render();