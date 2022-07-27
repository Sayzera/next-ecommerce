const { https } = require('firebase-functions');
const { default: next } = require('next');

// https://github.com/milon27/next-js-portfolio
const isDev = process.env.NODE_ENV !== 'production';

const server = next({
  dev: isDev,
  //location of .next generated after running -> yarn build
  conf: { distDir: '.next' },
});

const nextjsHandle = server.getRequestHandler();
exports.nextServer = https.onRequest((req, res) => {
  return server.prepare().then(() => {
    return nextjsHandle(req, res);
  });
});
