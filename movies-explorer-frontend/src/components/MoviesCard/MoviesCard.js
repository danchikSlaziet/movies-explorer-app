import './MoviesCard.css';
import notChosenPath from '../../images/not-chosen.svg';
import chosenPath from '../../images/chosen.svg';
import deleteIconPath from '../../images/deleteCard.svg';
import mainApi from '../../utils/MainApi';
import { NavLink } from 'react-router-dom';

export default function MoviesCard({copyLikedCards, setCopyLikedCards, cardInfo, inMovies, setSavedCards, savedCards}) {
  function buttonHandler(e) {
    if (inMovies) {
      if (e.target.src.includes('not-chosen')) {
        mainApi.addNewMovie(cardInfo.country, cardInfo.director, cardInfo.duration, cardInfo.year, cardInfo.description, `https://api.nomoreparties.co/${cardInfo.image.url}`, cardInfo.trailerLink, cardInfo.nameRU, cardInfo.nameEN, `https://api.nomoreparties.co/${cardInfo.image.formats.thumbnail.url}`, cardInfo.id)
          .then((data) => {
            setSavedCards([...savedCards, data]);
            e.target.src = chosenPath;
          })
          .catch(err => console.log(err));
      }
      else {
        mainApi.deleteMovie(cardInfo.id)
          .then(() => e.target.src = notChosenPath)
          .catch(err => console.log(err));

      }
    }
    else {
      mainApi.deleteMovie(cardInfo.movieId)
        .then((data) => {
          setSavedCards(savedCards.filter((c) => {
            return c.movieId !== data.movieId;
          }));
          setCopyLikedCards(copyLikedCards.filter((c) => {
            return c.movieId !== data.movieId;
          }));
        })
        .catch(err => console.log(err));
    }
  }

  function isLiked() {
    if (savedCards.some(e => e.movieId === cardInfo.id)) {
      return true;
    }
    return false;
  }

  return (
      <div className='film-banner'>
        <NavLink to={cardInfo.trailerLink} target='blank'>
          <img className='film-banner__img' src={inMovies ? `https://api.nomoreparties.co/${cardInfo.image.url}` : `${cardInfo.image}`} alt={`фотокарточка фильма ${cardInfo.nameRU}`}/>
        </NavLink>
        <div className='film-banner__wrapper'>
          <div className='film-banner__info'>
            <span className='film-banner__name'>
              {cardInfo.nameRU}
            </span>
            <span className='film-banner__duration'>
              {cardInfo.duration <= 60 ? `${cardInfo.duration}м` : `${Math.floor(cardInfo.duration/60)}ч${cardInfo.duration%60}м` }
            </span>
          </div>
          <button onClick={buttonHandler} className='film-banner__button' type="button">
            <img className='film-banner__svg' src={!inMovies ? deleteIconPath : isLiked() ? chosenPath : notChosenPath} alt={!inMovies ? 'кнопка удалить из избранного' : 'кнопка добавить в избранное'} />
          </button>
        </div>
      </div>
  );
}