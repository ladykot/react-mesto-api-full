export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:7777'
    : 'http://api.mesto.ladykot.nomoredomains.icu';
