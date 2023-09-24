import { useEffect, useState } from 'react';
import './SearchForm.css';
import searchPath from '../../images/find.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';

export default function SearchForm({ setIsSavedClick, setCopyLikedCards, copyLikedCards, setCopyCards, copyCards, inMovies, isSavedChecked, setIsSavedChecked, cards, setCards, setIsChecked, isChecked, setIsActivePreloader, setSearchError, savedCards, setSavedCards}) {
  const [film, setFilm] = useState('');

  function setNormalSearch(data) {
    setCards(data.filter((card) => card.nameRU.toLowerCase().includes(film.toLowerCase()) || card.nameEN.toLowerCase().includes(film.toLowerCase())));
    setCopyCards(data.filter((card) => card.nameRU.toLowerCase().includes(film.toLowerCase()) || card.nameEN.toLowerCase().includes(film.toLowerCase())));
    localStorage.setItem('films', JSON.stringify(data.filter((card) => card.nameRU.toLowerCase().includes(film.toLowerCase()) || card.nameEN.toLowerCase().includes(film.toLowerCase()))));
  }
  function setShortFilmsSearch(data) {
    setCards(data.filter((card) => card.duration <= '40' && (card.nameRU.toLowerCase().includes(film.toLowerCase()) || card.nameEN.toLowerCase().includes(film.toLowerCase()))));
    setCopyCards(data.filter((card) => card.nameRU.toLowerCase().includes(film.toLowerCase()) || card.nameEN.toLowerCase().includes(film.toLowerCase())));
    localStorage.setItem('films', JSON.stringify(data.filter((card) => card.nameRU.toLowerCase().includes(film.toLowerCase()) || card.nameEN.toLowerCase().includes(film.toLowerCase()))));
  }
  function filterSearch(data) {
    if (isChecked) {
      setShortFilmsSearch(data);
    }
    else {
      setNormalSearch(data);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (inMovies) {
      setIsActivePreloader(true);
      localStorage.setItem('search-value', film);
      moviesApi.getAllMovies()
      .then((data) => {
        filterSearch(data);
      })
      .catch((err) => {
        console.log(err);
        setSearchError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
      .finally(() => {
        setIsActivePreloader(false);
      });
    }
    else {
      if (isSavedChecked) {
        mainApi.getMyMovies()
        .then((data) => {
          setSavedCards(data.filter((card) => card.duration <= '40' && (card.nameRU.toLowerCase().includes(film.toLowerCase()) || card.nameEN.toLowerCase().includes(film.toLowerCase()))));
          setCopyLikedCards(data);
        })
        .catch(err => console.log(err));
      }
      else {
        mainApi.getMyMovies()
        .then((data) => {
          setSavedCards(data.filter((card) => (card.nameRU.toLowerCase().includes(film.toLowerCase()) || card.nameEN.toLowerCase().includes(film.toLowerCase()))));
          setCopyLikedCards(data);
        })
        .catch(err => console.log(err));
      }
      setIsSavedClick(true);
    }
  }

  useEffect(() => {
    if (inMovies && localStorage.getItem('search-value')) {
      setFilm(localStorage.getItem('search-value'));
    }
    else {
      setFilm('');
      inMovies && setCards([]);
      inMovies &&  setTimeout(seterror, 300)
    }
  }, [])

  function seterror() {
    setSearchError('Нужно ввести ключевое слово. ')
  }

  useEffect(() => {
    if (film  === '') {
      inMovies && setTimeout(seterror, 300)
    }
    else {
      inMovies && setSearchError('');
    }
  })

  useEffect(() => {
    if (!inMovies) {
      mainApi.getMyMovies()
      .then((data) => {
        setCopyLikedCards(data);
      })
      .catch(err => console.log(err));
    }
  }, [])

  return (
    <form onSubmit={handleSubmit} className='search-form'>
      <div className='search-form__input-wrapper'>
        <input required placeholder='Фильм' className='search-form__input' type="text" name="search" value={film} onChange={(e) => setFilm(e.target.value)} />
        <button className='search-form__button' type="submit">
          <img className='search-form__img' src={searchPath} alt="лупа иконка поиска" />
        </button>
      </div>
      <FilterCheckbox setIsSavedClick={setIsSavedClick} copyLikedCards={copyLikedCards} setCopyLikedCards={setCopyLikedCards} setCopyCards={setCopyCards} copyCards={copyCards} film={film} isSavedChecked={isSavedChecked} setIsSavedChecked={setIsSavedChecked} isChecked={isChecked} setIsChecked={setIsChecked} setIsActivePreloader={setIsActivePreloader} cards={cards} setCards={setCards} savedCards={savedCards} setSavedCards={setSavedCards} setSearchError={setSearchError} inMovies={inMovies}/>
    </form>
  );
}