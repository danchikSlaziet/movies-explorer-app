import { useState } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

export default function Movies({copyCards, setCopyCards, setIsActivePreloader, cards, setCards, setSavedCards, savedCards}) {
  const [isChecked, setIsChecked] = useState(false);
  const [searchError, setSearchError] = useState('');

  return (
        <main className='movies page__movies auto-width auto-width-movies'>
          <section className='search'>
            <SearchForm copyCards={copyCards} setCopyCards={setCopyCards} inMovies={true} setSearchError={setSearchError} setIsActivePreloader={setIsActivePreloader} setIsChecked={setIsChecked} isChecked={isChecked} setCards={setCards} cards={cards}/>
            <div className='search__error'>
              {searchError}
              {cards.length === 0 ? 'Ничего не найдено.' : ''}
            </div>
          </section>
          <section className='movie-cardList'>
            <MoviesCardList setSavedCards={setSavedCards} savedCards={savedCards} inMovies={true} cards={cards} />
          </section>
        </main>
  );
}