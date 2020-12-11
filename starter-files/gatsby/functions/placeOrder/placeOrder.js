const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `
  <div>
    <h2>Your Recent order for ${total}</h2>
    <p>Will be ready in 10 minutes</p>
    <ul>
      ${order
        .map(
          (item) => `
      <li>
        <img src="${item.thumbnail}" alt="${item.name}"/>
        ${item.size} ${item.name} - ${item.price}
      </li>`
        )
        .join('')}
    </ul>
    <p>Your total is <strong>${total}</strong> due at pickup</p>
    <style>
      ul {
        list-style-type: none;
      }
    </style>
  </div>`;
}

// 1. create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

exports.handler = async (event, context) => {
  // await wait(500);
  console.log(
    '🚀 ~ file: placeOrder.js ~ line 14 ~ exports.handler= ~ event.body',
    event.body
  );
  const body = JSON.parse(event.body);

  if (body.address) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Thank you! Somthing went wrong ☹️ ERROR: 1212',
      }),
    };
  }

  console.log(
    '🚀 ~ file: placeOrder.js ~ line 19 ~ exports.handler= ~ body',
    body
  );
  // validate the data coming in is correct
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    console.log(`Checking field: -> `, field);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Bummer, you're missing the ${field} field`,
        }),
      };
    }
  }

  // make sure the order isn't empty
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Your order is empty 😰`,
      }),
    };
  }

  // send the email
  // send the success or error message

  // test send an email
  const info = await transporter.sendMail({
    from: 'Slicks Slices <slick@example.com>',
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  console.log(
    '🚀 ~ file: placeOrder.js ~ line 31 ~ exports.handler= ~ info',
    info
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success 😃' }),
  };
};
