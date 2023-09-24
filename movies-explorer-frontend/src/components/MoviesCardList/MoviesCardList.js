import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import mainApi from '../../utils/MainApi';

export default function MoviesCardList({copyLikedCards, setCopyLikedCards, inMovies, cards, savedCards, setSavedCards}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [initialIndex, setInitialIndex] = useState(getCardsforSize());
  const [buttonClass, setButtonClass] = useState('movies__button');

  function getCardsforSize() {
    if (windowWidth >= '1280') {
      return 16;
    }
    else if (windowWidth >= '768') {
      return 8;
    }
    else {
      return 5;
    }
  }

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });
  useEffect(() => {
    // для перехода устройства из портретной ориентации в альбомную и наоборот
    setInitialIndex(getCardsforSize());
  }, [windowWidth])
  
  function buttonHandler() {
    if (getCardsforSize() === 16) {
      setInitialIndex(initialIndex + 4);
      if (cards.length - initialIndex <= 4) {
        setButtonClass('movies__button movies__button_no-visible');
      }
      else {
        setButtonClass('movies__button')
      }
    }
    else if (getCardsforSize() === 8) {
      setInitialIndex(initialIndex + 2);
      if (cards.length - initialIndex <= 2) {
        setButtonClass('movies__button movies__button_no-visible');
      }
      else {
        setButtonClass('movies__button')
      }
    }
    else if (getCardsforSize() === 5) {
      setInitialIndex(initialIndex + 2);
      console.log({'cards length': cards.length, 'initial index': initialIndex})
      if (cards.length - initialIndex <= 2) {
        setButtonClass('movies__button movies__button_no-visible');
      }
      else {
        setButtonClass('movies__button');
      }
    }
  };
  function getEffectDependencies() {
    if (inMovies) {
      return cards.length;
    }
  }

  useEffect(() => {
    if (cards) {
      setInitialIndex(getCardsforSize());
      if (cards.length <= initialIndex - 1) {
        setButtonClass('movies__button movies__button_no-visible');
      }
      else {
        setButtonClass('movies__button');
      }
    }
  }, [getEffectDependencies(), windowWidth]);

  useEffect(() => {
    // эффект для того, чтобы после пролистывания всех карточек (нажатием на кнопку ещё) при переходе в другую ориент ничего не ломалось
    if ( inMovies && cards.length <= initialIndex ) {
      setButtonClass('movies__button movies__button_no-visible');
    }
    else if (inMovies && !(cards.length <= initialIndex )) {
      setButtonClass('movies__button');
    }
  })

  useEffect(() => {
    mainApi.getMyMovies()
      .then((data) => {
        setSavedCards(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <>
      <div className='movie-cards'>
        <ul className='movie-cards__list'>
        {inMovies ? [...cards].slice(0, initialIndex).map((elem) => <li key={elem.id} className='movie-cards__item'><MoviesCard cardInfo={elem} inMovies={true} setSavedCards={setSavedCards} savedCards={savedCards}/></li>) 
          : 
      [...savedCards].map((elem) => <li key={Math.random()} className='movie-cards__item'><MoviesCard copyLikedCards={copyLikedCards} setCopyLikedCards={setCopyLikedCards} cardInfo={elem} inMovies={false} setSavedCards={setSavedCards} savedCards={savedCards} /></li>)}
        </ul>
      </div>
      {!inMovies ? <></> : cards.length === 0 ? <></> : <button onClick={buttonHandler} className={buttonClass} type="button">Ещё</button>}
    </>
  );
}