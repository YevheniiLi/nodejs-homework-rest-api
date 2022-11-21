const { createError } = require("../helpers/createError");

const validation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(createError(400, error.message));
    }
    next();
  };
};

module.exports = {
    validation,
};