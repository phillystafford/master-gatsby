const nodemailer = require('nodemailer');

// 1. create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  // test send an email
  const info = await transporter.sendMail({
    from: 'Slicks Slices <slick@example.com>',
    to: 'orders@example.com',
    subject: 'New order!',
    html: `<p>Your new pizza order is here!</p>`,
  });

  console.log(
    '🚀 ~ file: placeOrder.js ~ line 25 ~ exports.handler= ~ info',
    info
  );
  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};
