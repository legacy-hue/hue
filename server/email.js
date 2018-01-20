const nodemailer = require('nodemailer');
let config;
try {
    config = require('../config.js');
} catch (err) {
    console.log('cant find config file: ', err);
}


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'legacy.hue@gmail.com',
    pass: process.env.EMAIL_PASS || config.EMAIL_PASS
  }
});

module.exports.sendEmail = (name, email, token, host, message, route, subject) => {
  const mailOptions = {
    from: 'legacy.hue@gmail.com',
    to: email,
    subject: subject,
    html: `<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
      <tr>
        <td align="center" valign="top">
          <table border="0" cellpadding="20" cellspacing="0" width="600" id="emailContainer">
            <tr>
              <td align="center" valign="top">
                <p>Hi ${name}, click on <a href="${host + '/#/' + route + '/' + token}">this link</a> ${message}.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`
  };
  
  return transporter.sendMail(mailOptions);
};
