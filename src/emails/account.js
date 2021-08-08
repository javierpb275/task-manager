const sgMail = require('@sendgrid/mail');
const sendgridAPIKey = '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'
sgMail.setApiKey(sendgridAPIKey);
sgMail.send({
    to: 'javierpb275@gmail.com',
    from: 'javierpb275@gmail.com',
    subject: 'Checking sendgrid api works',
    text: 'Helloooo!!!'
});