
const mailConfig = require('../../config/mail.config');
const transporter = mailConfig.transporter;
const mail = 'arti.things.service@gmail.com';

const sendMail = (mailData) => {
  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('Email sent: ' + info.response);
  });
};

exports.sendMail = (params) => {
  const { to, subject, text, html, attachments } = params;
  const mailData = {
    from: mail,
    to,
    subject,
    text,
    html
  };
  if (html) {
    mailData.html = html;
  }
  if (attachments) {
    mailData.attachments = attachments;
  }


  console.log('Email sent (commenté): ' + info.response);
  sendMail(mailData);
};

exports.sendMailSimple = (to, subject, text) => {
  const mailData = {
    from: mail,
    to,
    subject,
    text,
  };
  sendMail(mailData);
};

exports.sendMailWithHTML = (to, subject, html) => {
  const mailData = {
    from: mail,
    to,
    subject,
    text: '',
    html
  };
  sendMail(mailData);
};

exports.sendMailWithPJ = (to, subject, text, attachments) => {
  const mailData = {
    from: mail,
    to,
    subject,
    text,
    attachments
  };
  sendMail(mailData);
};

  // const html = '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>',
  // const attachments = [
  //   {   // file on disk as an attachment
  //     filename: 'nodemailer.png',
  //     path: 'nodemailer.png'
  //   },
  //   {   // file on disk as an attachment
  //     filename: 'text_file.txt',
  //     path: 'text_file.txt'
  //   }
  // ];
