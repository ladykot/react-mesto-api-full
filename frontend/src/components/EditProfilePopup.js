import React, { useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, buttonText, title}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = React.useContext(CurrentUserContext); // подписка на контекст

  const handleChangeName = (e) => {
    // обработчик ловит данные из инпута c name
    setName(e.target.value);
  };

  const handleChangeDescription = (e) => {
    // обработчик ловит данные из инпута c about
    setDescription(e.target.value);
  };

  React.useEffect(() => {
    // хук устанавливает инпуты в зависимости от контекста
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const handleSubmit = (e) => { // обработчик сабмита формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
    >
      <fieldset className="popup__inputs">
        <input
          type="text"
          id="name-input"
          name="name"
          onChange={handleChangeName}
          value={name || ""}
          placeholder="Имя"
          className="popup__inputs-item popup__inputs-item_type_name"
          required
          minLength={2}
          maxLength="40"
        />
        <span className="name-input-error popup__inputs-error"></span>
        <input
          type="text"
          id="description-input"
          name="description"
          onChange={handleChangeDescription}
          value={description || ""}
          placeholder="Профессиональная деятельность"
          className="popup__inputs-item popup__inputs-item_type_description"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="description-input-error popup__inputs-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
