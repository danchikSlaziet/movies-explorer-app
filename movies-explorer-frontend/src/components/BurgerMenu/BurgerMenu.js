import './BurgerMenu.css';
import accountPath from '../../images/account-svg.svg';
import Navigation from '../Navigation/Navigation';

export default function BurgerMenu({ isBurgerOpen, burgerHandler, profileHandler }) {
  return (
    <div className={isBurgerOpen ? 'burger-menu burger-menu_active' : 'burger-menu'}>
      <Navigation burgerHandler={burgerHandler} navInBurger={true} />
      <button onClick={() => {
        profileHandler();
        burgerHandler();
      }} className='burger-menu__account' type="button">
        <span className='burger-menu__text'>
          Аккаунт
        </span>
        <img className='burger-menu__img' src={accountPath} alt="svg изображение кнопки профиля, белый силуэт на черном фоне" />
      </button>
    </div>
  );
}