import React from "react";
import union from "../images/Union.svg"
import unionErr from "../images/Union_err.svg"

function InfoTooltip({ isOpen, onClose, isSucess }) {
  return (
    <section
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      onClick={onClose}
    >
      <div
        className={`popup__container`}
        onClick={(e) => {
          e.stopPropagation(); // Прекращает дальнейшую передачу текущего события.
        }}
      >
        <button
          onClick={onClose}
          type="button"
          className="popup__button-close popup__button-close_type_edit hover"
        ></button>
        <form className="popup__form-info">
          { isSucess ?
            <>
              <img className="popup__info-image" src={union} alt="Успех!"/>
              <h3 className="popup__info-title">Вы успешно зарегистрировались!</h3>
            </> :
            <>
            <img className="popup__info-image" src={unionErr} alt="Ошибка"/>
            <h3 className="popup__info-title">Что-то пошло не так! Попробуйте ещё раз.</h3>
          </>
          }
        </form>
      </div>
    </section>
  );
}

export default InfoTooltip;
