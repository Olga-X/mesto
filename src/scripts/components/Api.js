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

setUser(data) {
  return fetch(`${this._url}/users/me`, {
    method: 'PATCH',
    headers:  this._headers,
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
  .then(this._checkResponse)
}

getUser() {
  return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
  })
  .then(this._checkResponse);
}

 setAvatar({avatar}) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers:  this._headers,
      body: JSON.stringify({
        avatar: avatar,
      })
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

setCard(data) {
  return fetch(`${this._url}/cards`, {
    method: 'POST',
    headers:  this._headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  })
  .then(this._checkResponse)
}

deleteCard(id) {
  return fetch(`${this._url}/cards/${id}`, {
    method: 'DELETE',
    headers:  this._headers,
  })
  .then(this._checkResponse)
}

setLike(id) {
  return fetch(`${this._url}/cards/${id}/likes`, {
    method: 'PUT',
    headers:  this._headers,
  })
  .then(this._checkResponse)
}

deleteLike(id) {
  return fetch(`${this._url}/cards/${id}/likes`, {
    method: 'DELETE',
    headers:  this._headers,
  })
  .then(this._checkResponse)
 }
}