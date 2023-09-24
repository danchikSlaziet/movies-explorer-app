import { NavLink, useNavigate } from 'react-router-dom';
import './Register.css';
import logoPath from '../../images/logo.svg';
import AuthForm from '../AuthForm/AuthForm';
import { useEffect, useState } from 'react';
import mainApi from '../../utils/MainApi';

export default function Register({setLoggedIn, checkToken, setCurrentUser}) {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({email: '', password: '', name: ''});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function logoHandler() {
    navigate('/');
  }

  function apiRegister({email, password, name}) {
    mainApi.register({name, email, password})
      .then((data) => {
        // чтобы после регистрации при обновлении страницы не пришлось логиниться
        mainApi.login({email, password})
        .then((data) => {
          setCurrentUser({name: name, email: email, userID: data.userID});
          setLoggedIn(true);
          navigate('/movies');
        })
        .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        if (err.includes('409')) {
          setErrors({...errors, authErr: 'Пользователь с такой почтой уже существует' });
        }
      });
  }
  const handleChange = (e) => {
    const name = e.target.name;
    setErrors({...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <main>
      <section className='register page__register'>
        <img onClick={logoHandler} className='register__logo' src={logoPath} alt="изображение логотипа" />
        <h1 className='register__text'>
          Добро пожаловать!
        </h1>
        <AuthForm inRegister={true} errorHandler={handleChange} isValid={isValid} setIsValid={setIsValid} errors={errors} setErrors={setErrors} registerHandler={apiRegister} buttonText={"Зарегистрироваться"} formValue={formValue} setFormValue={setFormValue} />
        <div className='register__link-wrapper'>
          <span className='register__question'>
            Уже зарегистрированы?
          </span>
          <NavLink className='register__link' to='/signin'>
            Войти
          </NavLink>
        </div>
      </section>
    </main>
  );
}