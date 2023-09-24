import './AuthForm.css';

export default function AuthForm({ formValue, setFormValue, buttonText, loginHandler, registerHandler, errorHandler, isValid, setIsValid, setErrors, errors, inRegister}) {

  let inputWrapperClass = inRegister ? 'auth-form__input-wrapper auth-form__input-wrapper_margin_other': 'auth-form__input-wrapper';

  const isNameValid = (str) => /^[а-яА-Яa-zA-ZЁёәіңғүұқөһӘІҢҒҮҰҚӨҺ\s-]*$/.test(str);
  const isEmailValid = ( email ) => {
    const expression =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return expression.test( String(email).toLowerCase() );
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (buttonText === 'Зарегистрироваться') {
      const {name, email, password} = formValue;
      registerHandler({name, email, password});
    }
    else {
      const {email, password} = formValue;
      loginHandler({email, password});
    }
  }
  return (
    <form onSubmit={handleSubmit} className='auth-form'>
      {inRegister ? <div className='auth-form__input-wrapper'>
        <span className='auth-form__label'>
          Имя
        </span>
        <input minLength={2} maxLength={30} placeholder='Введите имя' required className='auth-form__input auth-form__input_type_name' type="text" name="name" value={formValue.name} onChange={(e) => {
          setFormValue({ ...formValue, name: e.target.value });
          errorHandler(e);
          if (!isNameValid(e.target.value)) {
            setErrors({...errors, name: 'Поле имени может содержать только латиницу, кириллицу, пробел или дефис.'});
            setIsValid(false);
          }
          if (!isEmailValid(formValue.email)) {
            setIsValid(false);
          }
        }} />
        <span className='auth-form__error'>
          {errors.name}
        </span>
      </div> : <></>}
      <div className='auth-form__input-wrapper'>
        <span className='auth-form__label'>
          E-mail
        </span>
        <input onChange={(e) => {
          setFormValue({...formValue, email: e.target.value});
          errorHandler(e);
          if (!isEmailValid(e.target.value)) {
            setErrors({...errors, mail: 'Введите настоящий адрес почты'});
            setIsValid(false);
          }
          if (!isNameValid(formValue.name)) {
            setIsValid(false);
          }
          }} placeholder='Введите e-mail' required className='auth-form__input' type="email" name="mail" value={formValue.email} />
        <span className='auth-form__error'>
          {errors.mail}
        </span>
      </div>
      <div className={`auth-form__input-wrapper ${inputWrapperClass}`}>
        <span className='auth-form__label'>
          Пароль
        </span>
        <input onChange={(e) => {
          setFormValue({...formValue, password: e.target.value});
          errorHandler(e);
          if (!isNameValid(formValue.name)) {
            setIsValid(false);
          }
          if (!isEmailValid(formValue.email)) {
            setIsValid(false);
          }
          }} minLength={8} maxLength={50} placeholder='Введите пароль' required className='auth-form__input' type="password" name="password" value={formValue.password} />
        <span className='auth-form__error'>
          {errors.password}
        </span>
      </div>
      <span className='auth-form__error auth-form__error_above_button'>
          {errors.authErr}
      </span>
      <button className={ isValid ? 'auth-form__button' : 'auth-form__button auth-form__button_disabled'} disabled={!isValid} type="submit">{buttonText}</button>
    </form>
  );
}