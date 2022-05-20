import { openPopup, closePopup} from  "./utils.js"


export class Card {
  _imagePopup = document.querySelector('.popup_review-image');
  _imageReview = this._imagePopup.querySelector('.popup__image');
  _imageReviewDesc = this._imagePopup.querySelector('.popup__description');


constructor(data, selector) {
	this._name = data.name;
	this._link = data.link;
	this._selector = selector;

  this._toggleLike = this._toggleLike.bind(this);
  this._deleteCard = this._deleteCard.bind(this);
}

_getElement() {
  const cardElement = document
    .querySelector(this._selector)
    .content
    .querySelector('.еlement')
    .cloneNode(true);

  return cardElement;
}

_resetShowImage() {
  this._imageReviewDesc.textContent = '';
  this._imageReview.alt = '';
  this._imageReview.src = '';
}

// открытиe окна подробного просмотра нажатием на картинку
_handleShowImage() {
  this._resetShowImage();
  this._imageReviewDesc.textContent = this._name;
  this._imageReview.alt = this._name;
  this._imageReview.src = this._link;
  openPopup(this._imagePopup);
}
// закрытие попапа картинки
_handleClosePopup(){
  closePopup(this._imagePopup)};

// лайк
_toggleLike() {
  this._element.querySelector('.еlement__like').classList.toggle('еlement__like_active');
}

// удаление карточки 
_deleteCard() {
  this._element.remove();
  this._element = null;
}

// слушатели событий
_setEventListeners() {
   // событие открытия попапа
  this._element.querySelector('.еlement__image')
 .addEventListener('click', () => {this._handleShowImage});


  // событие лайка
  this._element.querySelector('.еlement__like')
  .addEventListener('click', this._toggleLike);

  // событие удаления карточки
this._element.querySelector('.element__btn-trash')
.addEventListener('click', this._deleteCard);

// событие закрытия попапа


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