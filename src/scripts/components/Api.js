export default class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
}

_checkResponse(res) {
  if (res.ok) {
      return res.json();
  } else {
      return Promise.reject(`Ошибка: ${res.status}`);
  }
}


getUserInfo() {
  return (fetch(`${this._url}/users/me`), {
      method: GET,
      headers: this._headers,
  })
  .then(this._checkResponse);
}


getInitialCards() {
  return (fetch(`${this._url}/cards`), {
      method: GET,
      headers: this._headers,
  })
  .then(this._checkResponse);
}

appendCard(data) {
  return (fetch(`${this._url}/cards`), {
      method: POST,
      headers: this._headers,
      body: JSON.stringify(data),
  })
  .then(this._checkResponse);
}


}
