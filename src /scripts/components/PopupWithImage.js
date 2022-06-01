import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageReview = this._popup.querySelector('.popup__image');
        this._imageReviewDesc = this._popup.querySelector('.popup__description');
    }

    open(name, link) {
        this._imageReviewDesc.textContent = name;
        this._imageReview.src = link;
        this._imageReview.alt = name;
        super.open();
    }
  }