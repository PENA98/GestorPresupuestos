const emailConfig = require("../config/email");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const util = require("util");

let transport = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass
  }
});

// Utilizar template de Handlebars
transport.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".handlebars",
      partialsDir: __dirname + "/../views/emails",
      layoutsDir: __dirname + "/../views/emails",
      defaultLayout: ""
    },
    viewPath: __dirname + "/../views/emails",
    extName: ".handlebars"
  })
);

exports.enviar = async opciones => {
  const opcionesEmail = {
    from: "Wall-E <noreply@wall-e.com>",
    to: opciones.user.email,
    subject: opciones.subject,
    template: opciones.template,
    context: {
      resetUrl: opciones.resetUrl
    }
  };

  const sendMail = util.promisify(transport.sendMail, transport);
  return sendMail.call(transport, opcionesEmail);
};
