import { useEffect } from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox({ setIsSavedClick, copyLikedCards, copyCards, isChecked, setIsChecked, isSavedChecked, setIsSavedChecked, inMovies, setIsActivePreloader, setCards, cards, setSavedCards, savedCards, setSearchError, film}) {

  useEffect(() => {
    if (localStorage.getItem('checkbox') && inMovies) {
      setIsChecked(localStorage.getItem('checkbox') === 'true');
    }
  }, [])

  function handleChange(e) {
    if (inMovies && film) {
      localStorage.setItem('checkbox', e.target.checked);
      setIsChecked(e.target.checked);
      if (!isChecked) {
        setCards(copyCards.filter((card) => card.duration <= '40' && (card.nameRU.toLowerCase().includes(film.toLowerCase()) || card.nameEN.toLowerCase().includes(film.toLowerCase()))));
      }
      else {
        setCards(copyCards.filter((card) => (card.nameRU.toLowerCase().includes(film.toLowerCase()) || card.nameEN.toLowerCase().includes(film.toLowerCase()))));
      }
  }
  else if (!inMovies && film) {
    setIsSavedChecked(e.target.checked);
    setIsSavedClick(true);
    if (!isSavedChecked) {
      setSavedCards(copyLikedCards.filter((card) => card.duration <= '40' && (card.nameRU.toLowerCase().includes(film.toLowerCase()) || card.nameEN.toLowerCase().includes(film.toLowerCase()))))
    }
    else {
      setSavedCards(copyLikedCards.filter((card) => (card.nameRU.toLowerCase().includes(film.toLowerCase()) || card.nameEN.toLowerCase().includes(film.toLowerCase()))))
    }
  }
  else if (!inMovies && !film) {
    setIsSavedClick(true);
    setIsSavedChecked(e.target.checked);
    if (!isSavedChecked) {
      setSavedCards(copyLikedCards.filter((card) => card.duration <= '40' ));
    }
    else {
      setSavedCards(copyLikedCards);
    }
  }
}

  return (
    <div className='search-form__filter filter'>
      <input onChange={handleChange} id='short-films' className='filter__checkbox' type="checkbox" name="short-films" checked={inMovies ? isChecked : isSavedChecked} />
      <label htmlFor='short-films' className='filter__text'>
        Короткометражки
      </label>
    </div>
  );
}