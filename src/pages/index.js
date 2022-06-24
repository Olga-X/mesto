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

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([userData, cardData]) => {

function createCard(item) {
  const cardElement = new Card({templateSelector: "#card-template", data: item,
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
  handleLikeClick:() => {
    if (cardElement._isLiked) {
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
  processUserData: userData
}) 
  return cardElement.generateCard();  
} 

// Отрисовка карточек

 const cardList = new Section(
  (item) => {
    const cardElement = createCard(item);
    cardList.addCard(cardElement);
  }, '.еlements__container');

cardList.renderItems(cardData);

// Класс создания картинки и формы 

const cardPopup = new PopupWithForm({
  popupSelector: '.popup_form_add-card', 
  handleFormSubmit: (data) => {
  cardPopup.renderBtnText('Создание');
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
.finally(() =>  cardPopup.renderBtnText('Создать'))
}
});
cardPopup.setEventListeners();

// Попап delete
const popupDelete = new PopupWithConfirmation({
  popupSelector: ".popup_delete",
});
popupDelete.setEventListeners();

// Класс для открытия попапа картинки
const imagePopup  = new PopupWithImage({
  popupSelector: '.popup_review-image',
});
imagePopup.setEventListeners();

// Редактирование профиля
const userInfo = new UserInfo({
  nameSelector: ".profile__title", 
  aboutSelector: ".profile__text",
  avatarSelector: ".profile__avatar"
});

const {name, about, avatar} = userData;
  userInfo.setUserInfo({name: name, about: about, avatar: avatar});

const profilePopup = new PopupWithForm({
  popupSelector: ".popup_form_edit-profile", 
  handleFormSubmit: (data) => {
  profilePopup.renderBtnText('Сохранение');
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
    .finally(() => profilePopup.renderBtnText('Сохранить'))
    }
  });
  profilePopup.setEventListeners();

const popupAvatar = new PopupWithForm({
  popupSelector: ".popup_avatar", 
  handleFormSubmit: (data) => {
    popupAvatar.renderBtnText('Сохранение');
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
    .finally(() => popupAvatar.renderBtnText('Сохранить'))
  }
  });
  popupAvatar.setEventListeners();

// валидация
const validationProfileForm = new FormValidator(config, profileForm);
validationProfileForm.enableValidation();

const validationCardAddForm = new FormValidator(config, cardAddForm);
validationCardAddForm.enableValidation();

const validationProfileAvatar = new FormValidator(config, profileFormAvatar);
validationProfileAvatar.enableValidation();

// Открывает попап профиль
profileEditBtn.addEventListener('click', () => {
  const currentInfo = userInfo.getUserInfo();
  profileNameInput.value = currentInfo.name;
  profileAboutInput.value = currentInfo.about;
  validationProfileForm.clearErrorsOnOpening();
  profilePopup.open();
});
  
//Открыть попап карточки
cardAddBtn.addEventListener("click", () => {
  cardPopup.open();
  validationCardAddForm.clearErrorsOnOpening();
});

//Открыть попап аватар
avatarAddBtn.addEventListener("click", () => {
  popupAvatar.open();
  validationProfileAvatar.clearErrorsOnOpening();
})
})