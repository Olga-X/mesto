export default class Card {
  _imagePopup = document.querySelector('.popup_review-image');
  _imageReview = this._imagePopup.querySelector('.popup__image');
  _imageReviewDesc = this._imagePopup.querySelector('.popup__description');

constructor(data, userId, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
	this._name = data.name;
	this._link = data.link;
  this._likes = data.likes;
  this._cardId = data._id;
  this._ownerId = data.owner._id;
  this._userId = userId;
	this._templateSelector = templateSelector;
  this._handleCardClick = handleCardClick;
  this._handleLikeClick = handleLikeClick;
  this._handleDeleteClick = handleDeleteClick;
}

_getTemplate() {
  const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.еlement')
    .cloneNode(true);

  return cardElement;
}

/*/isLiked() {
  return this._likes.some(item => item._id === this._userId);
}/*/

//метод like карточки
setLike(likes)  {
  this._cardElementLike.classList.add('еlement__like_active');
  this._isLiked = true;
  this._element.querySelector('.еlement__like-counter').textContent = likes.length;
}

removeLike(likes) {
  this._cardElementLike.classList.remove('еlement__like_active');
  this._isLiked = false;
  this._element.querySelector('.еlement__like-counter').textContent = likes.length;
}

// удаление карточки 
_deleteCard() {
  this.handleDeleteClick(this._element)
}

// слушатели событий
_setEventListeners() {
   // событие открытия попапа
   this._cardImage.addEventListener('click', () => {this._handleCardClick(this._name, this._link)});

  // событие лайка
  this._cardElementLike = this._element.querySelector('.еlement__like');
  this._cardElementLike.addEventListener('click',  () => {
  this._handleLikeClick();
  }); 

  // событие удаления карточки
  this._cardElementTrash = this._element.querySelector('.element__btn-trash')
  this._cardElementTrash.addEventListener('click', () =>{this._deleteCard()});
};

generateCard() {
  this._element = this._getTemplate();

  this._cardImage = this._element.querySelector('.еlement__image');
  this._cardImage.src = this._link;
  this._cardImage.alt = this._name;
  this._element.querySelector('.еlement__title').textContent = this._name;
  this._element.querySelector('.еlement__like-counter').textContent = this._likes.length;

  this._setEventListeners();

  if (this._userId._id === this._ownerId) {
    this._cardElementTrash.classList.add('element__btn-trash_visible');
  }

  if (this._likes.some(item => item._id === this._userId._id)) {
    this._isLiked = true;
    this._cardElementLike.classList.add('еlement__like_active');
  } else {
    this._isLiked = false;
  }

  return this._element;
  }
}