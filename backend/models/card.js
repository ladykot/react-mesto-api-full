const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

// Опишем схему карточки:
const userSchema = new mongoose.Schema({
  name: {
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url) => isUrl(url),
      message: 'Ссылка не корректна',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

// создаём модель и экспортируем её
module.exports = mongoose.model('card', userSchema);
