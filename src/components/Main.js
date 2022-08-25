import React from 'react';
import '../index.css';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Card from './Card';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return(
    <>
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" onClick={props.onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
          <p className="profile__information">{currentUser.about}</p>
        </div>
          <button className="profile__add-button" type="button" aria-label="Добавить фото" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
        <ul className="elements__team">
        {props.cards?.map((card) =>  {
              return (
                <Card 
                card={card} 
                key={card._id} 
                name={card.name} 
                link={card.link} 
                likes={card.likes.length}
                onCardClick={props.onCardClick} 
                onCardLike={props.onCardLike} 
                onCardDelete={props.onCardDelete} />
              );
            })}
        </ul>
      </section>
    </>
  )
}

export default Main;