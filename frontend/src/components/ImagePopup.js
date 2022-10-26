import React from "react";

function ImagePopup({ name, onClose, card, isOpen }) {
  if (card) {
    return (
      <section
        className={`popup popup_type_${name} ${
          isOpen ? "popup_opened" : ""
        } popup_dark `}
      >
        <div
          className={`popup__container popup__container_${name}`}
          onClick={(e) => {
            e.stopPropagation(); // Прекращает дальнейшую передачу текущего события.
          }}
        >
          <button
            onClick={onClose}
            type="button"
            className="popup__button-close popup__button-close_type_big-foto hover"
          ></button>
          <img
            className="popup__big-foto"
            src={card.link}
            alt="случайное фото"
          />
          <p className="popup__title-big-image">{card.name}</p>
        </div>
      </section>
    );
  }
}

export default ImagePopup;
