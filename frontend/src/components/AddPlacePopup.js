import React, {useState} from "react";
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup ({isOpen, onClose, onAddPlace, buttonText}) {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace({
        name,
        link,
        });
    }

    React.useEffect(() => {
        setName("");
        setLink("");
    }, [isOpen]);

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeLink = (e) => {
        setLink(e.target.value)
    }

    return (
        <PopupWithForm
          title="Новое место"
          name="create-card"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          buttonText={buttonText}
        >
        <fieldset className="popup__inputs">
          <input
            type="text"
            id="title-input"
            name="name"
            value={name || ""}
            onChange={handleChangeName}
            placeholder="Название"
            className="popup__inputs-item popup__inputs-item_type_title"
            required
            minLength="2"
            maxLength="30"
          />
          <span className="title-input-error popup__inputs-error"></span>
          <input
            type="url"
            id="link-input"
            name="link"
            value={link || ""}
            onChange={handleChangeLink}
            placeholder="Ссылка на картинку"
            className="popup__inputs-item popup__inputs-item_type_link"
            required
          />
        </fieldset>
          <span className="popup__inputs-error link-input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup