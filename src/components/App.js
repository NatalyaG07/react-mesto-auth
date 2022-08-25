import { useEffect, useState } from "react";
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import "../index.css";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import * as auth from './Auth';

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, satIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, satIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, satIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");
  const [isInfoTooltipPopupOpen, setIsInfoTooltip] = useState(false);
  const [serviceResponse, setServiceResponse] = useState(false);

  const history = useHistory();

  function handleEditProfileClick() {
    satIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    satIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    satIsEditAvatarPopupOpen(true);
  }

  function handleInfoTooltipPopupOpen() {
    setIsInfoTooltip(true);
  }

  function handleCardClick(card) {
    setSelectedCard({
      link: card.link,
      name: card.name,
    });
  }

  function closeAllPopups() {
    satIsEditProfilePopupOpen(false);
    satIsAddPlacePopupOpen(false);
    satIsEditAvatarPopupOpen(false);
    setIsInfoTooltip(false);
    setServiceResponse(false);
    setSelectedCard({});
  }

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleUpdateUser({ name, about: description }) {
    api
      .editProfile({
        name,
        about: description,
      })
      .then((updateUser) => {
        setCurrentUser(updateUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .editAvatar({ avatar })
      .then((updateUser) => {
        setCurrentUser(updateUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlace({ name, link }) {
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin() {
    if(!loggedIn) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }

  function tokenCheck() {
    if(localStorage.getItem("jwt")) {
      let jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt).then((res) => {
        if(res) {
          setUserData(res.data.email);
          setLoggedIn(true);
          history.push("/");
        }
      });
    }
  };
  
  useEffect(() => {
    tokenCheck();
  }, [userData, loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userData={userData} handleLogin={handleLogin}/>

        <Switch>
          <Route path="/sign-in">
            <Login handleLogin={handleLogin}/>
          </Route>

          <Route path="/sign-up">
            <Register 
              onInfoTooltipPopupOpen={handleInfoTooltipPopupOpen}
              setServiceResponse={setServiceResponse}
            />
          </Route>

          <ProtectedRoute path="/"
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            loggedIn={loggedIn}
            component={Main}
          />
        </Switch>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <PopupWithForm name="with_confirmation" title="Вы уверены?" />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          name="img-card"
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip 
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          serviceResponse={serviceResponse}
        />

        {loggedIn && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

{/* <div className="popup popup_with_confirmation">
              <div className="popup__content">
                <button className="popup__close" type="button"></button>
                <h2 className="popup__title popup__title_with_confirmation">Вы уверены?</h2>
                <button className="popup__save popup__save_with_confirmation" type="button">Да</button>
              </div>
            </div> */}