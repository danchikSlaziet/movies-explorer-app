import './Promo.css';
import promoImgPath from '../../images/promo-img.svg';
import { Link } from "react-scroll";

export default function Promo() {

  return (
    <div className='bg-blue'>
      <section className='promo page__promo auto-width auto-width-main'>
        <div className='promo__info'>
          <h1 className='promo__title'>
            Пет-проект junior веб&#8209;разработчика.
          </h1>
          <p className='promo__subtitle'>
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <Link 
            className='promo__link'
            to='project'
            spy={true}
            smooth={true}
            offset={-150}
            duration= {500}
          >
              Узнать больше
          </Link>
        </div>
        <img className='promo__image' src={promoImgPath} alt="изображение планета веб" />
      </section>
    </div>
  );
} 