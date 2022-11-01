const allowedCors = [
  'http://mesto.ladykot.nomoredomains.icu',
  'https://mesto.ladykot.nomoredomains.icu',
  'http://api.mesto.ladykot.nomoredomains.icu',
  'https://api.mesto.ladykot.nomoredomains.icu',
  // 'http://localhost:5555',
  // 'http://localhost:7777',
  // 'https://localhost:3000',
  // 'http://127.0.0.1:5555',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    // res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);

    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }
  return next();
};
