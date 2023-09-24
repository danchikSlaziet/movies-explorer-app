import './Footer.css';

export default function Footer() {
  return (
    <footer className='footer page__footer auto-width'>
      <span className='footer__text'>
        Пет-проект Danis.dev х BeatFilm.
      </span>
      <div className='footer__border'>
      </div>
      <div className='footer__info'>
        <span className='footer__copy'>
          © 2023
        </span>
        <ul className='footer__links'>
          <li>
            <a className='footer__link' href="https://github.com/danchikSlaziet/movies-explorer-frontend" target='blank'>
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}