export default class UserInfo {
  _nameSelector;
  _aboutSelector;
  constructor({nameSelector, aboutSelector}) {
      this._nameSelector = document.querySelector(nameSelector);
      this._aboutSelector = document.querySelector(aboutSelector);
  }

  getUserInfo(profileNameInput, profileAboutInput) {
        profileNameInput.value = this._nameSelector.textContent;
        profileAboutInput.value = this._aboutSelector.textContent;
  }

  setUserInfo(profileNameInput, profileAboutInput) {
      this._nameSelector.textContent = profileNameInput;
      this._aboutSelector.textContent = profileAboutInput;
  }
}