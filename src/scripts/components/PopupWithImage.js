import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  
  constructor(popupSelector) {
    super(popupSelector);
    this._imageReview = this._popup.querySelector(".popup__image");
    this._imageReviewDesc = this._popup.querySelector(".popup__description");
  }

    open(data) {
    this._imageReviewDesc.textContent = data.name;
    this._imageReview.alt = data.name;
    this._imageReview.src = data.link;
    super.open();
    }
  }