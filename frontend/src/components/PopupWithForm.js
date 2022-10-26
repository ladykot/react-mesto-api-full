import React from "react";

function PopupWithForm({
  title,
  name,
  isOpen,
  onClose,
  children,
  onSubmit,
  buttonText
}) {


  return (
    <section
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      // закрытие по оверлею
      onClick={onClose}
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
          className="popup__button-close popup__button-close_type_edit hover"
        ></button>
        <form className="popup__form" onSubmit={onSubmit} noValidate>
          <h3 className="popup__title">{title}</h3>
          {children}
          <button
            type="submit"
            className="popup__button-save"
            aria-label="Сохранить"
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
