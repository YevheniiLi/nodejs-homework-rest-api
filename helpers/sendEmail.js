const sgMail = require("@sendgrid/mail");
const createError = require("./createError");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const mail = { ...data, from: 'jekilllimarenko@gmail.com' };
    await sgMail.send(mail);
  } catch (error) {
    throw createError(404, 'Not Found');
  }
};

module.exports = sendEmail;
