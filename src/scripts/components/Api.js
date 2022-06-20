export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
}

_checkResponse(res) {
  if (res.ok) {
      return res.json();
  } 
      return Promise.reject(`Ошибка: ${res.status}`);
  }


getUser() {
  return fetch(`${this._url}/users/me`, {
    headers: this.headers
  })
  .then(this._checkResponse)
}


getInitialCards() {
  return fetch(`${this._url}/cards`, {
    method: 'GET',
    headers: this._headers,
  })
  .then(this._checkResponse);
}

appendCard(data) {
  return fetch(`${this._url}/cards`, {
      method: POST,
      headers: this._headers,
      body: JSON.stringify({ 
        name: data.name,
        link: data.link
      }),
  })
  .then(this._checkResponse);
}

editUserInfo(data) {
  return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
          name: data.name,
          about: data.about
      }),
  })
  .then(this._checkResponse);
}

addCard(data) {
  return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
  })
  .then(this._checkResponse);
}

deleteCard(id) {
  return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
  })
  .then(this._checkResponse);
}


addLike(id) {
  return fetch(`${this._url}cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
  })
  .then(this._checkResponse);
}

deleteLike(id) {
  return fetch(`${this._url}cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
  })
  .then(this._checkResponse);
}

setAvatar({avatar}) {
  return fetch(`${this._url}/users/me/avatar`, {
    method: 'PATCH',
    headers: this.headers,
    body: JSON.stringify({
      avatar: avatar,
    })
  })
  .then(this._checkResponse)
 }
}
