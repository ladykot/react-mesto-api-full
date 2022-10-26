// middleware авторизации для проверки JWT
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized_401');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Ошибка авторизации');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'abdbc2f26ff6791da689b0a5d60d260941ad23c414d6d14027ba42e84fdb45b4');
  } catch (err) {
    next(new UnauthorizedError('Ошибка авторизации'));
  }
  req.user = payload;
  return next();
};
