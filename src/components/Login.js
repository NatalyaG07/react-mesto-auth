import React, {  useState } from 'react';
import { useHistory} from 'react-router-dom';
import * as auth from './Auth';
import '../index.css';

function Login(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    if(!email || !password) {
      return;
    }
    auth.authorize(email, password)
    .then((data) => {
      if(!data) {
        console.log("Что-то пошло не так!");
      }
      
      if(data.token) {
        setEmail('');
        setPassword('');
        props.handleLogin();
        history.push("/");
        resetForm();
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function resetForm() {
    setEmail('');
    setPassword('');
  }

  return(
    <div className="login" >
      <div className="login__content">
        <h2 className="login_title">Вход</h2>
        <form className="login__form" name="login" method="post" noValidate onSubmit={handleSubmit}>
          <input
            id="email-input"
            className="login__input"
            type="email"
            name="email"
            required
            placeholder="Email"
            value={email || ''}
            onChange={(e) => { setEmail(e.target.value)}}
          />
          <label htmlFor="email-input"><span className="popup__error" id="email-input-error"></span></label>
          <input
            id="password-input"
            className="login__input"
            type="password"
            name="password"
            required minLength="6"
            maxLength="15"
            placeholder="Пароль"
            value={password || ''}
            onChange={(e) => { setPassword(e.target.value)}}
            />
          <label htmlFor="password-input"><span className="popup__error" id="password-input-error"></span></label>
          <button className="login__save " type="submit">Войти</button>
        </form>
      </div>
  </div>
  )
}

export default Login;