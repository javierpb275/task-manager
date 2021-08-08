const sgMail = require("@sendgrid/mail");
const sendgridAPIKey = process.env.SENGRID_API_KEY;
sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: process.env.GMAIL,
    subject: "Thanks for joining!",
    text: `Welcome to the app, ${name}.`,
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: process.env.GMAIL,
    subject: "Sad to see you go",
    text: `Goodbye, ${name}.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
