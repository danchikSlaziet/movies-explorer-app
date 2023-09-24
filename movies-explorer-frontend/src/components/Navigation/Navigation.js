import { NavLink } from 'react-router-dom';
import './Navigation.css';

export default function Navigation({navInBurger, burgerHandler, loggedIn}) {
  return (
    <>
      {navInBurger ? <nav className='burger-menu__nav nav'>
        <ul className='burger-menu__list'>
          <li className='burger-menu__item'>
            <NavLink onClick={burgerHandler} className={({ isActive }) => (isActive ? "burger-menu__link burger-menu__link_active" : "burger-menu__link")} to='/'>Главная</NavLink>
          </li>
          <li className='burger-menu__item'>
            <NavLink onClick={burgerHandler} className={({ isActive }) => (isActive ? "burger-menu__link burger-menu__link_active" : "burger-menu__link")} to='/movies'>Фильмы</NavLink>
          </li>
          <li className='burger-menu__item'>
            <NavLink onClick={burgerHandler} className={({ isActive }) => (isActive ? "burger-menu__link burger-menu__link_active" : "burger-menu__link")} to='/saved-movies'>Сохранённые фильмы</NavLink>
          </li>
        </ul>
      </nav> : !loggedIn ? <></> : 
      <nav className='header__nav nav'>
        <ul className='nav__list'>
          <li className='nav__item'>
            <NavLink className={({ isActive }) => (isActive ? "nav__link nav__link_active" : "nav__link")} to='/movies'>Фильмы</NavLink>
          </li>
          <li className='nav__item'>
            <NavLink className={({ isActive }) => (isActive ? "nav__link nav__link_active" : "nav__link")} to='/saved-movies'>Сохранённые фильмы</NavLink>
          </li>
        </ul>
      </nav>}
    </>
  );
}