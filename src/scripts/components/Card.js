export default class Card {
  constructor({data, templateSelector, processUserData, handleCardClick, handleDeleteClick, handleLikeClick}) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._processUserData = processUserData;
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
  _handleDelete()  {
    this._handleDeleteClick(this._element)
  }
  
  // слушатели событий
  _setEventListeners() {
     // событие открытия попапа
     this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  
    // событие лайка
    this._cardElementLike = this._element.querySelector('.еlement__like');
    this._cardElementLike.addEventListener('click', () => {
    this._handleLikeClick(this._isLiked)
    }); 
  
    // событие удаления карточки
    this._cardElementTrash = this._element.querySelector('.element__btn-trash');
    this._cardElementTrash.addEventListener('click', () => {
      this._handleDelete()
    });
  }
  
  generateCard() {
    this._element = this._getTemplate();
  
    this._cardImage = this._element.querySelector('.еlement__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._element.querySelector('.еlement__title').textContent = this._name;
    this._element.querySelector('.еlement__like-counter').textContent = this._likes.length;
    this._setEventListeners();
  
    if (this._processUserData._id === this._ownerId) {
      this._cardElementTrash.classList.add('element__btn-trash_visible');
    }
  
    if (this._likes.some(item => item._id === this._processUserData._id)) {
      this._isLiked = true;
      this._cardElementLike.classList.add('еlement__like_active');
    } else {
      this._isLiked = false;
    }
  
    return this._element;
    }
  }