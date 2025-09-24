const nodemailer = require("nodemailer");

const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Sends an email with given subject and HTML content
exports.sendEmail = async (to, subject, htmlContent) => {
  await mailTransporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    html: htmlContent,
  });
};
