const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlPattern } = require('../utils/url-pattern');

const {
  addCard,
  getCards,
  deleteCard,
  addLike,
  dislike,
} = require('../controllers/cards');

router.get('/', getCards); // endpoint
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(urlPattern),
    }),
  }),
  addCard,
);

router.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteCard,
);

router.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  addLike,
);

router.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  dislike,
);

module.exports = router;
