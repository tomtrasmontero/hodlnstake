const router = require('express').Router();
const axios = require('axios');
const key = process.env.SYNCPROD ? process.env.FIREBASE_API : require('../env/development').FIREBASE_API;
const db = require('../db').models;

router.post('/signup', (req, res, next) => {
  const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${key}`;
  const { emailSignUp, passwordSignUp, usernameSignUp } = req.body.values;
  const authData = {
    email: emailSignUp,
    password: passwordSignUp,
    returnSecureToken: true,
  };

  axios.post(url, authData)
    .then((firebasePayload) => {
      const data = {
        email: emailSignUp,
        firebaseUID: firebasePayload.data.localId,
        name: usernameSignUp,
      };

      // save it in the back end, then send the firebase response to frontend on success
      return db.Users.create(data)
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          console.log(err);
          next();
        });
    })
    .catch((err) => {
      // firebase error handling
      res.status(err.response.data.error.code).send(err.response.data.error);
      next(err.response.data);
    });
});

router.post('/login', (req, res, next) => {
  const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${key}`;
  const { email, password } = req.body.values;
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };

  axios.post(url, authData)
    .then((firebasePayload) => {
      res.send(firebasePayload.data);
    })
    .catch((err) => {
      // firebase error handling
      res.status(err.response.data.error.code).send(err.response.data.error);
      next(err.response.data);
    });
});

module.exports = router;
