import React from 'react';
import '../index.css';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
const isOwn = props.card.owner._id === currentUser._id;

// Создаём переменную, которую после зададим в `className` для кнопки удаления
const cardDeleteButtonClassName = (
  `elements__remove ${isOwn ? 'elements__remove_active' : ''}`
);

// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
const isLiked = props.card.likes.some(i => i._id === currentUser._id);

// Создаём переменную, которую после зададим в `className` для кнопки лайка
const cardLikeButtonClassName = (
  `elements__like ${isLiked ? 'elements__like_active' : ''}`
);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleCardDelite() {
    props.onCardDelete(props.card);
  }

  return(
    <article className="elements__iteam">
      <img className="elements__img" src={props.link} alt={props.name} onClick={handleClick} /> 
      <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить" onClick={handleCardDelite}></button>
      <div className="elements__info">
        <h2 className="elements__title">{props.name}</h2>
        <div className="elements__like-group">
          <button className={cardLikeButtonClassName} type="button" aria-label="Лайк" onClick={handleLikeClick}></button>
          <h3 className="elements__like-counter">{props.likes}</h3>
        </div>
      </div>
    </article>
  )
}

export default Card;

