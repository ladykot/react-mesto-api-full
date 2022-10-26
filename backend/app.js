const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const helmet = require('helmet');
const NotFoundError = require('./errors/not-found_404');
const { createUser, login } = require('./controllers/users');
const auth = require('./midlewares/auth');
const { errorHandler } = require('./midlewares/errorHandler');
const { urlPattern } = require('./utils/url-pattern');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet()); // проставляем заголовки безопасности
// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(20),
      avatar: Joi.string().pattern(urlPattern),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.use(requestLogger); // подключаем логгер запросов
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

// app.get('/signout', (req, res) => {
//   res.status(200).clearCookie('jwt').send({ message: 'Logout' });
// });

// обработка несуществующих адресов
app.all('*', (req, res, next) => {
  next(new NotFoundError('Страницца не найдена'));
});

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
