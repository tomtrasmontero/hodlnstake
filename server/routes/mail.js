const router = require('express').Router();
const nodemailer = require('nodemailer');
const username = process.env.SYNCPROD ? process.env.GMAIL_NAME : require('../env/development').GMAIL_NAME;
const password = process.env.SYNCPROD ? process.env.GMAIL_PASS : require('../env/development').GMAIL_PASS;

// email info
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: username,
    pass: password,
  },
});

router.post('/', (req, res) => {
  const mailOptions = {
    from: 'tomlearnsprogramming@gmail.com',
    to: 'tomlearnsprogramming@gmail.com',
    subject: `${req.body.email} has sent a message`,
    text: `Email: ${req.body.email} , ${req.body.message}`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
      res.send(false);
    } else {
      res.send(true);
    }
  });
});

module.exports = router;
