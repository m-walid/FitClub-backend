exports.generateOTP = (otp_length) => {
  // Declare a digits variable
  // which stores all digits
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

exports.checkOtpExpValid = (timeStamp) => {
  const diffInMins = (Date.now() - timeStamp) / 60000;
  return diffInMins < 3;
};
