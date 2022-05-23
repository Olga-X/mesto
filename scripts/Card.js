import {openPopup, closePopup} from  "./utils.js"

export class Card {
  _imagePopup = document.querySelector('.popup_review-image');
  _imageReview = this._imagePopup.querySelector('.popup__image');
  _imageReviewDesc = this._imagePopup.querySelector('.popup__description');
  _cardElementLike = document.querySelector('.еlement__like');
  _cardImage = document.querySelector('.еlement__image');
  _cardElementBtn = document.querySelector('.element__btn-trash');

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
  this._cardElementLike.querySelector('.еlement__like')
  .classList.toggle('еlement__like_active');
}

// удаление карточки 
_deleteCard() {
  this._element.remove();
  this._element = null;
}

// слушатели событий
_setEventListeners() {
   // событие открытия попапа
   this._cardImage.addEventListener('click', () => {this._handleShowImage()});

  // событие лайка
  this._cardElementLike.addEventListener('click',  () => {this._toggleLike()});

  // событие удаления карточки
  this._cardElementBtn.addEventListener('click', () =>{this._deleteCard()});
};

generate() {
  this._element = this._getElement();
  this._element.querySelector('.еlement__image').src = this._link;
  this._element.querySelector('.еlement__title').textContent = this._name;
  this._element.querySelector('.еlement__image').alt = this._name;

  this._setEventListeners();

  return this._element;
  };
}