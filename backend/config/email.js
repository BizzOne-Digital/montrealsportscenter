const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

async function sendNotification({ subject, html }) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
    console.error('Email notification skipped: EMAIL_USER or EMAIL_APP_PASSWORD not set in .env');
    return;
  }
  await transporter.sendMail({
    from: `"MSC Website" <${process.env.EMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL || process.env.EMAIL_USER,
    subject,
    html,
  });
}

module.exports = { sendNotification };
