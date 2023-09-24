import './AboutMe.css';
import photoPath from '../../images/avatar.jpg'

export default function AboutMe() {
  return (
    <section className='about-me page__about-me auto-width auto-width-main'>
      <h2 className='title about-me__title'>
        Студент
      </h2>
      <div className='dividing-line about-me__line'>
      </div>
      <div className='about-me__info'>
        <div className='about-me__text'>
          <h3 className='about-me__name'>
            Данис
          </h3>
          <p className='about-me__career'>
            Фронтенд-разработчик, 24 года
          </p>
          <p className='about-me__history'>
            Я&nbsp;родился и&nbsp;живу в&nbsp;данный момент в Челябинске, закончил факультет проблем физики и энергетики МФТИ (Москва).
            Я&nbsp;люблю слушать музыку, а&nbsp;ещё 
            играю в футбол. Больше года занимаюсь разработкой. 
            Раньше работал учителем математики/физики, а также работал на научной базе в качестве младшего научного сотрудника.
          </p>
          <a className='about-me__link' href="https://github.com/danchikSlaziet" target='blank'>Github</a>
        </div>
        <img className='about-me__img' src={photoPath} alt="фото веб-разработчика" />
      </div>
    </section>
  );
}