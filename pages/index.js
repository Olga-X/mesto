let modalWindow = document.querySelector('.popup');
let modalCloseBtn = modalWindow.querySelector('.popup__close');
let modalEditBtn = document.querySelector('.profile__button-edit');
let profileName = document.querySelector('.profile__title');
let profileDescription = document.querySelector('.profile__text');
let profileForm = modalWindow.querySelector('.form');
let profileNameInput = modalWindow.querySelector('.form__input_name');
let profileAboutInput = modalWindow.querySelector('.form__input_about');


// Открыть-Закрыть

function toggleModalWindow() {
  modalWindow.classList.toggle('popup_opened');
}

// Закрыть по клику на крестик

modalCloseBtn.addEventListener('click', toggleModalWindow);

// Открыть редактировать по клик

modalEditBtn.addEventListener('click', function() {

  profileNameInput.value = profileName.textContent;
  profileAboutInput.value = profileDescription.textContent;

  toggleModalWindow(modalWindow);
})

// Обработчик «отправки» формы для изменения профиля

function profileEditSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileAboutInput.value;

  toggleModalWindow(modalWindow);

  profileForm.reset();
}
// Прикрепляем обработчик к форме:он будет следить за событием “submit” - «отправка»

profileForm.addEventListener('submit', profileEditSubmit);