export default class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}) {
      this._name = document.querySelector(nameSelector);
      this._about = document.querySelector(aboutSelector);
      this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const data={};
        data.name = this._name.textContent;
        data.about = this._about.textContent;

        return data;
  }

  setUserInfo(nameProfile, aboutMe) {
    this._name.textContent = nameProfile;
    this._about.textContent = aboutMe;
    this._avatar.src = avatar;
  }
  setAvatar(avatar) {
    this._avatar.src = avatar;
  }

}