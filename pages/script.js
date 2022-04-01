let profileEditBtn = document.querySelector('.profile__button-edit');
let profileUserName = document.querySelector('.profile__title');
let profileUserDescription = document.querySelector('.profile__text');
let popupProfile = document.querySelector('.popup');
let popupProfileNameInput = popupProfile.querySelector('.form__input_type_name');
let popupProfileAboutInput = popupProfile.querySelector('.form__input_type_about');
let popupProfileCloseBtn = popupProfile.querySelector('.popup__close');
let profileForm = popupProfile.querySelector('.form');

/* Открытие поп ап */

function popupOpened(popup) {
  popup.classList.add('popup_opened');
}

/* Закрытие поп ап */

function popupClose(popup) {
  popup.classList.remove('popup_opened');
}

/* Открываем редактировать профиль поп ап по клик */

profileEditBtn.addEventListener('click', function() {

  popupProfileNameInput.value = profileUserName.textContent;
  popupProfileAboutInput.value = profileUserDescription.textContent;

  popupOpened(popupProfile);
})

/* Закрываем поп ап по клику на крестик */

popupProfileCloseBtn.addEventListener('click', () => popupClose(popupProfile));
