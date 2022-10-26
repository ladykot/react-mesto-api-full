import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, buttonText, title, name}) {
    const avatar = React.useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateAvatar(avatar.current.value); // получаем значение из рефа
      }

    React.useEffect(() => {
      (avatar.current.value = "")
    }, [isOpen]);

    return (
        <PopupWithForm
          title={title}
          name={name}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          buttonText={buttonText}
        >
        <fieldset className="popup__inputs">
          <input
            type="url"
            id="link-input-avatar"
            name="link"
            ref={avatar}
            placeholder="Ссылка на картинку"
            className="popup__inputs-item popup__inputs-item_type_link"
            required
          />
        </fieldset>
          <span className="popup__inputs-error link-input-avatar-error"></span>
        </PopupWithForm>
        )
}

export default EditAvatarPopup;