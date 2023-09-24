import { useNavigate } from 'react-router-dom';
import logoPath from '../../images/logo.svg';
import accountPath from '../../images/account-svg.svg';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import { useState } from 'react';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import BurgerButton from '../BurgerButton/BurgerButton';

// обёртка bg-blue для того, чтобы уши на 1280+ были того же цвета, хз как по-другому сделать не через JS и чтобы семантика осталась
export default function Header({ inMain, loggedIn, profileHandler, loginHandler, registerHandler}) { 
  const navigate = useNavigate();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const otherPadding = 'header_padd_other';

  function logoHandler() {
    navigate('/');
  }
  function burgerHandler() {
    setIsBurgerOpen(!isBurgerOpen);
  }

  return (
    <div className={!inMain ? 'bgHeader-logged' : 'bg-blue'}>
      <header className={`header page__header auto-width ${!loggedIn ? '' : otherPadding}`}>
        <img onClick={logoHandler} className='header__logo' src={logoPath} alt="изображение логотипа" />
        <Navigation loggedIn={loggedIn}/>
        <div className='header__buttons-wrapper'>
          {loggedIn ? 
          <button onClick={profileHandler} className='header__account account' type="button">
            <span className='account__text'>
              Аккаунт
            </span>
            <img className='account__img' src={accountPath} alt="svg изображение кнопки профиля, белый силуэт на черном фоне" />
          </button> : 
          <>
            <button onClick={registerHandler} className='header__button header__button_type_registration' type="button">Регистрация</button>
            <button onClick={loginHandler} className='header__button header__button_type_login' type="button">Войти</button>
          </> }
          {!loggedIn ? <></> : <BurgerButton isBurgerOpen={isBurgerOpen} burgerHandler={burgerHandler}/>}
        </div>
        <BurgerMenu profileHandler={profileHandler} isBurgerOpen={isBurgerOpen} burgerHandler={burgerHandler} />
        <div className={isBurgerOpen ? 'overlay overlay_active' : 'overlay'}>
        </div>
      </header>
    </div>
  );
};