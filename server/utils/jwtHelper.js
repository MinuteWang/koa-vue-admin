const jwt = require('jsonwebtoken');
const config = require('../config');

const jwtHelper = {
  sign(data) {
    return jwt.sign(data, config.token_cert, {
      expiresIn: '2h'
    });
  },
  verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, config.token_cert, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }
};

module.exports = jwtHelper;
