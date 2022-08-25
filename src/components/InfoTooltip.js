import React from 'react';
import '../index.css';
import success from '../images/success.svg';
import error from '../images/error.svg';

function InfoTooltip(props) {
  return(
    <div className={`popup ${props.isOpen && 'popup_active'}`}>
      <div className="popup__content">
        <button className="popup__close" type="button" onClick={props.onClose}></button>
        <img className="popup__infoTooltip-img" src={props.serviceResponse ? success : error} alt={props.serviceResponse ? 'Успех' : 'ошибка'} />
        <h2 className="popup__title">{props.serviceResponse ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;