class MoviesApi {
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

  getAllMovies() {
    const url = this._baseUrl;
    const options = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      },
    }
    return this._getFetch(url, options);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
});
export default moviesApi;