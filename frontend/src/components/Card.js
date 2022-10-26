import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete, onCardDeleteClick }) {
  const currentUser = React.useContext(CurrentUserContext);
  const {link, name, _id, owner: {_id: ownerId}} = card;

  const isOwn = ownerId === currentUser._id;
  const likes = card.likes.map((item) => item._id); // упрощаем работу с лайками, оставили только id
  const isLiked = likes.includes(currentUser._id);


  // обработчик клика по карточке для просмотра изображения
  function handleImageClick() {
    onCardClick(card); 
  }

  // обработчик клика на Сердечко
  function handleLikeClick() {
    onCardLike(card, isLiked);
  }

  // обработчик клика на Корзину
  function handleDeleteClick() {
    onCardDeleteClick(card)
  }

  return (
    <div className="cards__item">
      <img
        className="cards__item-pic hover"
        src={link}
        onClick={handleImageClick}
      />
      {isOwn && (
        <button
          type="button"
          className="cards__item-delete"
          aria-label="корзина"
          onClick={handleDeleteClick}
        ></button>
      )}

      <div className="cards__item-group">
        <h2 className="cards__title">{name}</h2>
        <button
          type="button"
          className={`cards__union ${isLiked && "cards__union_active"}`}
          aria-label="лайк"
          onClick={handleLikeClick}
        ></button>
        <span className="cards__button-counter">{card.likes.length}</span>
      </div>
    </div>
  );
}

export default Card;
