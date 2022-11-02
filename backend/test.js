const jwt = require('jsonwebtoken');

const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzYyNWEyYzFmMGE1MzM4OWE5NTUzMDUiLCJpYXQiOjE2NjczOTkwODQsImV4cCI6MTY2ODAwMzg4NH0.8-Op17DNSTuIoAQtV6sDrtgfVWMRIuFPj3u_UKiVVhw'; // вставьте сюда JWT, который вернул публичный сервер
const SECRET_KEY_DEV = 'abdbc2f26ff6791da689b0a5d60d260941ad23c414d6d14027ba42e84fdb45b4'; // вставьте сюда секретный ключ для разработки из кода
try {
  const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
  console.log(
    '\x1b[31m%s\x1b[0m',
    `
Надо исправить. В продакшне используется тот же
секретный ключ, что и в режиме разработки.
`,
  );
} catch (err) {
  if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
    console.log(
      '\x1b[32m%s\x1b[0m',
      'Всё в порядке. Секретные ключи отличаются',
    );
  } else {
    console.log('\x1b[33m%s\x1b[0m', 'Что-то не так', err);
  }
}
