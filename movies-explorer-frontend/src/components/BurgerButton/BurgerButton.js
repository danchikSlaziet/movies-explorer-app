import './BurgerButton.css';

export default function BurgerButton({isBurgerOpen, burgerHandler}) {
  return (
    <div onClick={burgerHandler} className='burger-button'>
      <div className={isBurgerOpen ? 'burger-button__line burger-button__line_active' : 'burger-button__line'}>
      </div>
      <div className={isBurgerOpen ? 'burger-button__line burger-button__line_active' : 'burger-button__line'}>
      </div>
      <div className={isBurgerOpen ? 'burger-button__line burger-button__line_active' : 'burger-button__line'}>
      </div>
    </div>
  );
}