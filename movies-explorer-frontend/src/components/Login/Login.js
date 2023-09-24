import './Login.css';
import logoPath from '../../images/logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthForm from '../AuthForm/AuthForm';
import { useEffect, useState } from 'react';
import mainApi from '../../utils/MainApi';

export default function Login({setLoggedIn, checkToken}) {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({email: '', password: ''});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    setErrors({...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  };

  function apiLogin({email, password}) {
    mainApi.login({email, password})
      .then((data) => {
        setLoggedIn(true);
        navigate('/movies');
        })
      .catch((err) => {
        console.log(err);
        if (err.includes('409')) {
          setErrors({...errors, authErr: 'Логин или пароль неверны' });
        }
        else if (err.includes('401')) {
          setErrors({...errors, authErr: 'Пользователь не найден' });
        }
      });
  };

  function logoHandler() {
    navigate('/');
  }

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <main>
      <section className='login page__login'>
        <img onClick={logoHandler} className='login__logo' src={logoPath} alt="изображение логотипа" />
        <p className='login__text'>
          Рады видеть!
        </p>
        <AuthForm errorHandler={handleChange} isValid={isValid} setIsValid={setIsValid} errors={errors} setErrors={setErrors} loginHandler={apiLogin} buttonText={'Войти'} formValue={formValue} setFormValue={setFormValue} />
        <div className='login__link-wrapper'>
          <span className='login__question'>
            Ещё не зарегистрированы?
          </span>
          <NavLink className='login__link' to='/signup'>
            Регистрация
          </NavLink>
        </div>
      </section>
    </main>
  );
}