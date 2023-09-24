import './Portfolio.css';

export default function Portfolio() {
  return (
    <section className='portfolio page__portfolio auto-width auto-width-main'>
      <h2 className='portfolio__title'>
        Портфолио
      </h2>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <a className='portfolio__link link' href="https://github.com/danchikSlaziet/how-to-learn" target='blank'>
            <p className='link__text'>
              Статичный сайт
            </p>
            <p className='link__arrow'>
              ↗
            </p>
          </a>
        </li>
        <li className='portfolio__item'>
        <a className='portfolio__link link' href="https://github.com/danchikSlaziet/russian-travel-new" target='blank'>
            <p className='link__text'>
              Адаптивный сайт
            </p>
            <p className='link__arrow'>
              ↗
            </p>
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link link' href="https://github.com/danchikSlaziet/react-mesto-api-full-gha" target='blank'>
            <p className='link__text'>
              Одностраничное приложение
            </p>
            <p className='link__arrow'>
              ↗
            </p>
          </a>
        </li>
      </ul>
    </section>
  );
}