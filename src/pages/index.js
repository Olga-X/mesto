import "../pages/index.css"
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';
import UserInfo from "../scripts/components/UserInfo.js";
import Api from '../scripts/components/Api.js';
import {config,  
  profileForm,
  cardAddForm,
  profileFormAvatar,
  profileNameInput,
  profileAboutInput,
 } from "../utils/constants";

const profileEditBtn = document.querySelector('.profile__button-edit');
const cardAddBtn = document.querySelector('.profile__button-add');
const avatarAddBtn = document.querySelector(".profile__avatar-btn");

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-43', 
  headers: {
    authorization: 'fd597ad8-95e3-4b9d-9691-61d858c2f79f',
    'Content-Type': 'application/json',
  },
});

let userId;

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([userData, cardData]) => {
  userInfo.setUserInfo(userData);
  userId = userData._id;
  cardList.renderItems(cardData, userData._id);
  })
  .catch((err) => {
    console.log(err);
});

function createCard(item) {
  const cardElement = new Card({templateSelector: "#card-template", data: item, userId: userId,
  handleCardClick:  () => {
    imagePopup.open(item);
  },
  handleDeleteClick: (element) => {
    popupDelete.open();
    popupDelete.setSubmitHandler(
      () => {
        api
        .deleteCard(item._id)
        .then(() => {
          element.remove();
          popupDelete.close();
        })
        .catch((err) => {
          console.log(err);
        })
      }
    )
  },
  handleLikeClick:(isLiked) => {
    if (isLiked) {
      api.deleteLike(item._id)
      .then(res => {
        cardElement.removeLike(res.likes)
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      api.setLike(item._id)
        .then(res => {
          cardElement.setLike(res.likes)
        })
        .catch((err) => {
          console.log(err);
        })
    }
  },
   userId
}) 
  return cardElement.generateCard();  
} 

// ?????????????????? ????????????????

 const cardList = new Section(
  (item) => {
    const cardElement = createCard(item);
    cardList.addCard(cardElement);
  }, '.??lements__container');


// ?????????? ???????????????? ???????????????? ?? ?????????? 

const cardPopup = new PopupWithForm({
  popupSelector: '.popup_form_add-card', 
  handleFormSubmit: (data) => {
  cardPopup.renderBtnText('??????????????');
  api.setCard({
    name: data.name,
    link: data.link
  })
  .then(res => {
    const cardElement = createCard(res);
  cardList.addCard(cardElement);
  cardPopup.close();
})
.catch((err) => {
  console.log(err);
})
.finally(() =>  cardPopup.renderBtnText('??????????????'))
}
});
cardPopup.setEventListeners();

// ?????????? delete

const popupDelete = new PopupWithConfirmation({
  popupSelector: ".popup_delete",
});
popupDelete.setEventListeners();

// ?????????? ?????? ???????????????? ???????????? ????????????????
const imagePopup  = new PopupWithImage({
  popupSelector: '.popup_review-image',
});
imagePopup.setEventListeners();

// ???????????????????????????? ??????????????

const userInfo = new UserInfo({
  nameSelector: ".profile__title", 
  aboutSelector: ".profile__text",
  avatarSelector: ".profile__avatar"
});

const profilePopup = new PopupWithForm({
  popupSelector: ".popup_form_edit-profile", 
  handleFormSubmit: (data) => {
  profilePopup.renderBtnText('????????????????????...');
  api.setUser({
    name: data.name,
    about: data.about
  })
    .then(res => {
      userInfo.setUserInfo(res);
      profilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => profilePopup.renderBtnText('??????????????????'))
    }
  });
  profilePopup.setEventListeners();

const popupAvatar = new PopupWithForm({
  popupSelector: ".popup_avatar", 
  handleFormSubmit: (data) => {
    popupAvatar.renderBtnText('????????????????????...');
    api.setAvatar({
      avatar: data.avatar
    })
    .then(res => { 
      userInfo.setAvatar(res);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupAvatar.renderBtnText('??????????????????'))
  }
  });
  popupAvatar.setEventListeners();

// ??????????????????

const validationProfileForm = new FormValidator(config, profileForm);
validationProfileForm.enableValidation();

const validationCardAddForm = new FormValidator(config, cardAddForm);
validationCardAddForm.enableValidation();

const validationProfileAvatar = new FormValidator(config, profileFormAvatar);
validationProfileAvatar.enableValidation();

// ?????????????????? ?????????? ??????????????

profileEditBtn.addEventListener('click', () => {
  const currentInfo = userInfo.getUserInfo();
  profileNameInput.value = currentInfo.name;
  profileAboutInput.value = currentInfo.about;
  validationProfileForm.clearErrorsOnOpening();
  profilePopup.open();
});
  
//?????????????? ?????????? ????????????????

cardAddBtn.addEventListener("click", () => {
  cardPopup.open();
  validationCardAddForm.clearErrorsOnOpening();
});

//?????????????? ?????????? ????????????

avatarAddBtn.addEventListener("click", () => {
  popupAvatar.open();
  validationProfileAvatar.clearErrorsOnOpening();
})