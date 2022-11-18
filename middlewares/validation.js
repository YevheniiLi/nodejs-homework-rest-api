const validation = (schema) => {
  return function (req, res, next) {
    const validateBody = schema.validate(req.body);
    if (validateBody.error) {
      console.log(validateBody.error);
      next(validateBody.error);
    }
    next();
  };
};

module.exports = { validation };