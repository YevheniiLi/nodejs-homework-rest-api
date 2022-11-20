const Joi = require("joi");

  const addContactValidation = Joi.object({
      name: Joi.string().alphanum().min(3).max(10).required(),
      email: Joi.string().email().required(),
      phone: Joi.string()
        .pattern(/^[0-9]+$/)
        .required(),
    });


  const updateContactValidation = Joi.object({
      name: Joi.string().alphanum().min(3).max(10).required(),
      email: Joi.string().email().required(),
      phone: Joi.string()
        .pattern(/^[0-9]+$/)
        .required(),
    });


    module.exports ={
        addContactValidation,
        updateContactValidation,
    }