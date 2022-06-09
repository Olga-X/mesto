export default class Card {
  _imagePopup = document.querySelector('.popup_review-image');
  _imageReview = this._imagePopup.querySelector('.popup__image');
  _imageReviewDesc = this._imagePopup.querySelector('.popup__description');


constructor(data, templateSelector, handleCardClick) {
	this._name = data.name;
	this._link = data.link;
	this._templateSelector = templateSelector;
  this._handleCardClick = handleCardClick;
}

 _getElement() {
  const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.еlement')
    .cloneNode(true);

  return cardElement;
}


//метод like карточки
_toggleLike() {
  this._cardElementLike.classList.toggle('еlement__like_active');
}

// удаление карточки 
_deleteCard() {
  this._element.remove();
  this._element = null;
}

// слушатели событий
_setEventListeners() {
   // событие открытия попапа
   this._cardImage.addEventListener('click', () => {this._handleCardClick(this._name, this._link)});

  // событие лайка
  this._cardElementLike = this._element.querySelector('.еlement__like');
  this._cardElementLike.addEventListener('click',  () => {this._toggleLike()}); 

  // событие удаления карточки
  this._cardElementTrash = this._element.querySelector('.element__btn-trash')
  this._cardElementTrash.addEventListener('click', () =>{this._deleteCard()});
};

generateCard() {
  this._element = this._getElement();

  this._cardImage = this._element.querySelector('.еlement__image');
  this._cardImage.src = this._link;
  this._cardImage.alt = this._name;
  this._element.querySelector('.еlement__title').textContent = this._name;

  this._setEventListeners();

  return this._element;
  };

}