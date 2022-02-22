const sgMail = require("@sendgrid/mail");
const { logger } = require("../utils/logger");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = (options) => {
  sgMail
    .send({
      from: "fitclub.app.team@gmail.com",
      ...options,
    })
    .then((response) => {
      //   console.log(response[0].statusCode);
      //   console.log(response[0].headers);
    })
    .catch((error) => {
      logger.error(error);
    });
};

const sendOtpMail = (to, code) => {
  const msg = {
    to,
    subject: "FitClub OTP",
    text: "Here is your OTP code",
    html: `<strong>${code}</strong>`,
  };
  sendMail(msg);
  logger.debug(msg);
};

const mailService = { sendOtpMail };

module.exports = {
  mailService,
};
