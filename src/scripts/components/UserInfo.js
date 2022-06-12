export default class UserInfo {
  constructor({nameSelector, aboutSelector}) {
      this._name = document.querySelector(nameSelector);
      this._about = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    const data={};
        data.name= this._name.textContent;
        data.about = this._about.textContent;
        return data;
  }

  setUserInfo(nameProfile, aboutMe) {
    this._name.textContent = nameProfile;
    this._about.textContent = aboutMe;
  }
}