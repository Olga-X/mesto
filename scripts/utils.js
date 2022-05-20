export { openPopup, closePopup, closePressEsc}

// Функция открытия
function openPopup(popup) {
  document.addEventListener("keydown", closePressEsc);
  popup.classList.add('popup_opened');
}

// Функция закрытия
function closePopup(popup) {
  document.removeEventListener("keydown", closePressEsc);
  popup.classList.remove('popup_opened'); 
}

// Закрытие кнопкой esc
function closePressEsc(evt) {
  if (evt.key === "Escape") {
      closePopup(document.querySelector(".popup_opened"));
  }
};
