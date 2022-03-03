import sgMail from '@sendgrid/mail';
import { logger } from '@utils/logger';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export default class MailService {
  private static sendMail = (options) => {
    sgMail
      .send({
        from: 'fitclub.app.team@gmail.com',
        ...options,
      })
      .then(() => {
        //   console.log(response[0].statusCode);
        //   console.log(response[0].headers);
      })
      .catch((error) => {
        logger.error(error);
      });
  };

  static sendOtpMail = (to, code) => {
    const msg = {
      to,
      subject: 'FitClub OTP',
      text: 'Here is your OTP code',
      html: `<strong>${code}</strong>`,
    };
    MailService.sendMail(msg);
  };
}
