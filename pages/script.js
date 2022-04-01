let popupProfile = document.querySelector('.popup');
let popupProfileCloseBtn = popupProfile.querySelector('.popup__close');
let profileEditBtn = document.querySelector('.profile__button-edit');
let profileUserName = document.querySelector('.profile__title');
let profileUserDescription = document.querySelector('.profile__text');
let profileForm = popupProfile.querySelector('.form');
let popupProfileNameInput = popupProfile.querySelector('.form__input_type_name');
let popupProfileAboutInput = popupProfile.querySelector('.form__input_type_about');


// Открыть поп ап 

function popupOpened(popup) {
  popup.classList.add('popup_opened');
}

// Закрыть поп ап 

function popupClose(popup) {
  popup.classList.remove('popup_opened');
}

// Открыть редактировать профиль поп ап по клик

profileEditBtn.addEventListener('click', function() {

  popupProfileNameInput.value = profileUserName.textContent;
  popupProfileAboutInput.value = profileUserDescription.textContent;

  popupOpened(popupProfile);
})

// Закрыть поп ап по клику на крестик

popupProfileCloseBtn.addEventListener('click', () => popupClose(popupProfile));

// Обработчик «отправки» формы для изменения профиля

function handleProfileEditSubmit(event) {
  event.preventDefault();

  profileUserName.textContent = popupProfileNameInput.value;
  profileUserDescription.textContent = popupProfileAboutInput.value;

  popupClose(popupProfile);

  profileForm.reset();
}
// Прикрепляем обработчик к форме:он будет следить за событием “submit” - «отправка»

profileForm.addEventListener('submit', handleProfileEditSubmit);