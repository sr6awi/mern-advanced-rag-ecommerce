// Generates a 4-digit OTP as string
exports.generateOtp = () => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp.toString();
};
  