const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');
const isEmail = require('validator/lib/isEmail');

// Опишем схему пользователя:
const userSchema = new mongoose.Schema({
  name: {
    type: String, // имя — это строка
    default: 'Жак-Ив Кусто', // оно должно быть у каждого пользователя
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (url) => isUrl(url),
      message: 'Ссылка не корректна',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // пароль не будет возвращаться из базы
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
