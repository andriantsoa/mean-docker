// Mail
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // true for 465, false for other ports
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL_USERNAME_ARTI,
    pass: process.env.EMAIL_PASSWORD_ARTI
  },
  tls: {
    rejectUnauthorized: false
  }
});

exports.transporter = transporter;


/**
 * Here, options define connection data and it includes
options.port
Port to connect to (defaults to 25 or 465)
options.host
Hostname or IP address to connect to (defaults to ‘localhost’). If you are using SMTP with Google, you have to put ‘smtp.gmail.com’ as a host.
options.secure
It defines if the connection should use SSL (if true) or not (if false). if you are connecting to port 465 it should be true. For port 587 or 25 keep it false.
options.auth
It defines authentication data,
Type — indicates the authentication type, defaults to ‘login’, other option is ‘oauth2’
user — Username
pass — Password for the user if normal login is used
options.ignoreTLS
It turns off STARTTLS support if true
options.name
The optional hostname of the client, used for identifying the server
options.localAddress
It is the local interface to bind to network connections
options.connectionTimeout
How many milliseconds to wait for the connection to establish. (default is 2 minutes)
options.authMethod
It defines the preferred authentication method, eg. ‘PLAIN’
options.tls
It defines additional options to be passed to the socket constructor, eg. {rejectUnauthorized: true}

 */