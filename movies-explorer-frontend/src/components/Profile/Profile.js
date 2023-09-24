import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import './Profile.css';
import { useContext, useState } from 'react';

export default function Profile({outHandler, setCurrentUser}) {
  const userInfo = useContext(CurrentUserContext);
  const [isInputConfig, setIsInputConfig] = useState({name: userInfo.name, mail: userInfo.email, userId: userInfo.userID, isDisabled: true, activeClass: ''});
  const [isType, setIsType] = useState('button');
  const [isText, setIsText] = useState('Редактировать');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDisabledBtn, setIsDisabledBtn] = useState(false);

  function updateUserInfo(name, mail) {
    setIsDisabledBtn(true);
    mainApi.updateProfileInfo({name, mail})
        .then((data) => {
          setCurrentUser({...userInfo, name: data.name, email: data.email});
          setIsSuccess(true);
          setIsText('Редактировать');
          setIsType('button');
          setIsDisabledBtn(false);
        })
        .catch((err) => {
          console.log(err);
          setIsSuccess(false);
          setIsInputConfig({...isInputConfig, name: userInfo.name, mail: userInfo.email});
          if (err.includes('409')) {
            setErrors({...errors, otherErr: 'Пользователь с такой почтой уже существует' });
          }
        });
  }

  function isDisabledButton() {
    if ( isText === 'Сохранить' && (isInputConfig.name === userInfo.name && isInputConfig.mail === userInfo.email) ) {
      return true;
    }
    else {
      return false;
    }
  }

  function exitHandler() {
    outHandler();
    localStorage.clear();
  }

  function editHandler(e) {
    e.preventDefault();
    if (isText === 'Редактировать') {
      setIsInputConfig({...isInputConfig, isDisabled: false, activeClass: 'profile__input_active'});
      setIsText('Сохранить');
      setIsType('submit');
    }
    else {     
      setIsInputConfig({...isInputConfig, isDisabled: true, activeClass: ''});
      updateUserInfo(isInputConfig.name, isInputConfig.mail);
    }
  }

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);
  const handleChange = (e) => {
    const name = e.target.name;
    setErrors({...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
  };

  const isNameValid = (str) => /^[а-яА-Яa-zA-ZЁёәіңғүұқөһӘІҢҒҮҰҚӨҺ\s-]*$/.test(str);
  const isEmailValid = ( email ) => {
    const expression =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return expression.test( String(email).toLowerCase() );
  }

  return (
    <main>
      <section className='profile page__profile'>
        <h1 className='profile__greeting'>
          Привет, {userInfo.name}!
        </h1>
        <form className='profile__form'>
          <div className='profile__info'>
            <div className={isValid ? 'profile__wrapper' : 'profile__wrapper profile__wrapper_not-valid'}>
              <span className='profile__field'>
                Имя
              </span>
              <span className='profile__error profile__error_type_name'>
                {errors.name}
              </span>
              <input name='name' minLength={2} maxLength={30} required type='text' placeholder='введите имя' className={`profile__name profile__input ${isInputConfig.activeClass}`} value={isInputConfig.name} disabled={isInputConfig.isDisabled} onChange={(e) => {
                setIsInputConfig({...isInputConfig, name: e.target.value});
                handleChange(e);
                if (!isNameValid(e.target.value)) {
                  setErrors({...errors, name: 'Поле имени может содержать только латиницу, кириллицу, пробел или дефис.'});
                  setIsValid(false);
                }
                if (!isEmailValid(isInputConfig.mail)) {
                  setIsValid(false);
                }
              }}/>
            </div>
            <div className='profile__wrapper'>
              <span className='profile__field'>
                E-mail
              </span>
              <span className='profile__error profile__error_type_email'>
                {errors.email}
              </span>
              <input name='email' required type='email' placeholder='введите почту' className={`profile__mail profile__input ${isInputConfig.activeClass}`} value={isInputConfig.mail} disabled={isInputConfig.isDisabled} onChange={(e) => {
                setIsInputConfig({...isInputConfig, mail: e.target.value});
                handleChange(e);
                if (!isEmailValid(e.target.value)) {
                  setErrors({...errors, email: 'Введите настоящий адрес почты'});
                  setIsValid(false);
                }
                if (!isNameValid(isInputConfig.name)) {
                  setIsValid(false);
                }
                }}/>
            </div>
          </div>
          <div className='profile__buttons'>
            <div className={isSuccess ? 'profile__success' : 'profile__other-error'}>
              {isSuccess ? 'Данные успешно сохранены' : errors.otherErr}
            </div>
            <button onClick={editHandler} className={isValid && !isDisabledButton() && !isDisabledBtn ? 'profile__edit-btn profile__btn' : 'profile__edit-btn profile__edit-btn_disabled profile__btn'} disabled={!isValid || isDisabledButton() || isDisabledBtn} type={isType}>{isText}</button>
            <button onClick={exitHandler} className='profile__exit-btn profile__btn' type="button">Выйти из аккаунта</button>
          </div>
        </form>
      </section>
    </main>
  );
}