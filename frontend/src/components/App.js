import React, { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "../index.css";
import Footer from "./Footer";

import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import * as userAuth from "../utils/Auth";
import ProtectedRoute from "./ProtectedRoute";

import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isPopupWithSubmitOpen, setPopupWithSubmitOpen] = useState(false);
  const [isSelectedCard, setSelectedCard] = useState(null);
  const [removedCard, setRemovedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({}); // текущий пользователь
  const [userData, setUserdata] = useState({});

  const history = useHistory();
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState({
    isOpen: false,
    isSucess: false,
  }); // состояние окна спеха/неуспеха

  // авторизация и запись токена в хранилище
  const onLogin = ({ email, password }) => {
    return userAuth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token); // сохранили токен
          setLoggedIn(true); // залогинились
          history.push("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const onRegister = ({ email, password }) => {
    return userAuth
      .register(email, password)
      .then((res) => {
        if (res.data) {
          setInfoTooltipOpen({ isOpen: true, isSucess: true });
          history.push("/signin");
        } else {
          setInfoTooltipOpen({ isOpen: true, isSucess: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("/");
  };

  // Аутотенфикация: если токен валиден, сохраняем данные, и пользователь логинится
  const auth = async (jwt) => {
    return userAuth
      .getContent(jwt)
      .then((res) => {
        // если такой есть, то логинимся
        if (res) {
          setUserdata(res.data.email);
          setLoggedIn(true);
          history.push("/");
        } else {
          setInfoTooltipOpen({ isOpen: true, isSucess: false });
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // проверка наличия токена в хранилище при изменении loggedIn
  React.useEffect(() => {
    if (!loggedIn) {
      if (localStorage.getItem("jwt")) {
        const jwt = localStorage.getItem("jwt");
        auth(jwt);
      }
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialCards(), api.getProfileData()])
        .then(([cards, data]) => {
          setCards(cards);
          setCurrentUser(data);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  // при клике на карточку
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  // удаление карточки и обновление блока с карточками
  function handleCardDelete(e) {
    e.preventDefault();
    api
      .deleteCard(removedCard._id)
      .then((res) => {
        setCards((state) =>
          state.filter((item) => item._id !== removedCard._id)
        );
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // обработка лайка
  function handleCardLike(card, isLiked) {
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((res) => {
        setCards((state) => state.map((c) => (c._id === res._id ? res : c)));
      })
      .catch((err) => console.log(err));
  }

  // состояния открытия
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleCardDeleteClick = (card) => {
    setRemovedCard(card);
    setPopupWithSubmitOpen(true);
  };

  // состояния закрытия
  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setPopupWithSubmitOpen(false);
    setInfoTooltipOpen(false);
  };



  // добавление новых данных в профиле
  const handelUpdateUser = ({ name, about }) => {
    api
      .editProfileData(name, about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  // добавление нового аватара
  const handleUpdateAvatar = (avatar) => {
    api
      .changeAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  // добавление новой карточки на сервер
  const handleAddPlaceSubmit = ({ name, link }) => {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userData={userData} loggedIn={loggedIn} onSignOut={onSignOut} />

        <Switch>

          <Route path="/signin">
            <Login title="Вход" buttonText="Войти" onLogin={onLogin} />
          </Route>

          <Route path="/signup">
            <Register
              title="Регистрация"
              buttonText="Зарегистрироваться"
              onRegister={onRegister}
              isOpenInfo={setInfoTooltipOpen}
            />
          </Route>

          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
            onCardDeleteClick={handleCardDeleteClick} // открыли попап подтверждения
            cards={cards}
          />

        </Switch>

        <Footer />
        <ImagePopup
          name="big-image"
          isOpen={!!isSelectedCard} // если есть карта, то isOpen == true
          card={isSelectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen.isOpen}
          isSucess={isInfoTooltipOpen.isSucess}
          onClose={closeAllPopups}
        />

        <EditProfilePopup
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handelUpdateUser}
          buttonText="Сохранить"
        />

        <AddPlacePopup
          title="Новое место"
          name="create-card"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonText="Сохранить"
        />

        <PopupWithForm
          title="Вы уверены?"
          name="delete-card"
          isOpen={isPopupWithSubmitOpen}
          onClose={closeAllPopups}
          buttonText="Да"
          onSubmit={handleCardDelete}
        />

        <EditAvatarPopup
          title="Обновить аватар"
          name="change-avatar"
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
          buttonText="Сохранить"
        ></EditAvatarPopup>

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
