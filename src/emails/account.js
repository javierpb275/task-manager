const sgMail = require("@sendgrid/mail");
const sendgridAPIKey = "";
sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "pepe@gmail.com",
    subject: "Thanks for joining!",
    text: `Welcome to the app, ${name}.`,
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "pepe@gmail.com",
    subject: "Sad to see you go",
    text: `Goodbye, ${name}.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
