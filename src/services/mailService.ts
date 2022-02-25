import sgMail from "@sendgrid/mail";
import { logger } from "../utils/logger";
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
};

const mailService = { sendOtpMail };

export { mailService };
