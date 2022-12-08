 const emailWrapper = (email, verificationToken) => {
    const mail ={
        to: email,
        subject: "Confirmation of registration",
        html: `<p>Please, confirm your email <a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">${email}</a></p>`,
      };
      return mail;
    }
 
module.exports = emailWrapper;