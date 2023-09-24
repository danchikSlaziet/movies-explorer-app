class MainApi {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getFetch(url, options) {
    return fetch(url, options)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`)
      });
  }

  login({ email, password }) {
    const url = this._baseUrl + 'signin';
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({
        'password': password,
        'email': email
      })
    }
    return this._getFetch(url, options);
  }

  register({ name, email, password }) {
    const url = this._baseUrl + 'signup';
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({
        'email': email,
        'password': password,
        'name': name,
      })
    }
    return this._getFetch(url, options);
  }
  
  signOut() {
    const url = this._baseUrl + 'signout';
    const options = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
    }
    return this._getFetch(url, options);
  }

  getInfoAboutMe() {
    const url = this._baseUrl + 'users/me';
    const options = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
    }
    return this._getFetch(url, options);
  }

  updateProfileInfo({name, mail}) {
    const url = this._baseUrl + 'users/me';
    const options = {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        email: mail
      })
    }
    return this._getFetch(url, options);
  }

  getMyMovies() {
    const url = this._baseUrl + 'movies';
    const options = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
    }
    return this._getFetch(url, options);
  }

  addNewMovie(
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId
  ) {
    const url = this._baseUrl + 'movies';
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({
        country: country,
        director: director,
        duration: duration,
        year: year,
        description: description,
        image: image,
        trailerLink: trailerLink,
        nameRU: nameRU,
        nameEN: nameEN,
        thumbnail: thumbnail,
        movieId: movieId
      })
    }
    return this._getFetch(url, options);
  }

  deleteMovie(id) {
    const url = this._baseUrl + 'movies/' + id;
      const options = {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
      }
      return this._getFetch(url, options);
  }
}

const mainApi = new MainApi({
  baseUrl: 'http://localhost:4000/',
});
export default mainApi;