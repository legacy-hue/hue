const nodemailer = require('nodemailer');
const config = require('../config.js');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'legacy.hue@gmail.com',
    pass: process.env.EMAIL_PASS || config.EMAIL_PASS
  }
});