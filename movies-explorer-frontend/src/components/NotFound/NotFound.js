import { useNavigate } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();
  function backHandler() {
    navigate('/');
    // navigate(-1) работал очень криво, так и не разобрался почему
  }
  return (
    <main>
      <div className='not-found'>
        <span className='not-found__error'>
          404
        </span>
        <span className='not-found__text'>
          Страница не найдена
        </span>
        <button type='button' className='not-found__back' onClick={backHandler}>
          Назад
        </button>
      </div>
    </main>
  );
}