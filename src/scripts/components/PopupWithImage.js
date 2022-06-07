import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  
  constructor(popupSelector) {
    super(popupSelector);
    this._imageReview = this._popupSelector.querySelector(".popup__image");
    this._imageReviewDesc = this._popupSelector.querySelector(".popup__description");
  }

    open({link, name}) {
    imageReviewDesc.textContent = name;
    imageReview.alt = name;
    imageReview.src = link;
     super.open();
    }
  }