import './Techs.css'

export default function Techs() {
  return (
    <div className='bg-gray'>
      <section className='techs page__techs auto-width auto-width-main'>
        <h2 className='title techs__title'>
          Технологии
        </h2>
        <div className='dividing-line techs__line'>
        </div>
        <h3 className='techs__reheading'>
          7 технологий
        </h3>
        <p className='techs__text'>
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p> 
        <ul className='techs__cards'>
          <li className='techs__card'>
            HTML
          </li>
          <li className='techs__card'>
            CSS
          </li>
          <li className='techs__card'>
            JS
          </li>
          <li className='techs__card'>
            React
          </li>
          <li className='techs__card'>
            Git
          </li>
          <li className='techs__card'>
            Express.js
          </li>
          <li className='techs__card'>
            mongoDB
          </li>
        </ul>
      </section>
    </div>
  );
}