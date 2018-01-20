const nodemailer = require('nodemailer');
// const config = require('../config.js');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'legacy.hue@gmail.com',
    pass: process.env.EMAIL_PASS || config.EMAIL_PASS
  }
});

module.exports = (name, email, token, host) => {
  const mailOptions = {
    from: 'legacy.hue@gmail.com',
    to: email,
    subject: 'Reset your Hue password',
    html: `<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
      <tr>
        <td align="center" valign="top">
          <table border="0" cellpadding="20" cellspacing="0" width="600" id="emailContainer">
            <tr>
              <td align="center" valign="top">
                <p>Hi ${name}, click on <a href="${host + '/#/recovery/' + token}">this link</a> to reset your password.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`
  };
  
  return transporter.sendMail(mailOptions);
};
