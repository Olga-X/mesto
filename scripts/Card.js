import {openPopup} from  "./utils.js"

export class Card {
  _imagePopup = document.querySelector('.popup_review-image');
  _imageReview = this._imagePopup.querySelector('.popup__image');
  _imageReviewDesc = this._imagePopup.querySelector('.popup__description');
 

constructor(data, templateSelector ) {
	this._name = data.name;
	this._link = data.link;
	this._templateSelector = templateSelector ;
}

_getElement() {
  const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.еlement')
    .cloneNode(true);

  return cardElement;
}

// открытиe окна подробного просмотра нажатием на картинку
_handleShowImage() {
  this._imageReviewDesc.textContent = this._name;
  this._imageReview.alt = this._name;
  this._imageReview.src = this._link;
  openPopup(this._imagePopup);
}

// лайк
_toggleLike() {
  const cardImage = this._element.querySelector('.еlement__like');
  cardImage.classList.toggle('еlement__like_active');
}

// удаление карточки 
_deleteCard() {
  this._element.remove();
  this._element = null;
}

// слушатели событий
_setEventListeners() {
   // событие открытия попапа
  const cardImage = this._element.querySelector('.еlement__image');
  cardImage.addEventListener('click', () => {this._handleShowImage()});

  // событие лайка
  const cardElementLike = this._element.querySelector('.еlement__like');
  cardElementLike.addEventListener('click',  () => {this._toggleLike()});

  // событие удаления карточки
  const cardElementTrash = this._element.querySelector('.element__btn-trash')
  cardElementTrash.addEventListener('click', () =>{this._deleteCard()});
};

generate() {
  this._element = this._getElement();

  const cardImage = this._element.querySelector('.еlement__image');
  cardImage.src = this._link;
  cardImage.alt = this._name;
  this._element.querySelector('.еlement__title').textContent = this._name;

  this._setEventListeners();

  return this._element;
  };
}