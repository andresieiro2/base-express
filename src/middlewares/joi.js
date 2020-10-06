import Joi from 'joi';

const buildUsefulErrorObject = errors => {
  const usefulErrors = [];
  errors.map(error => {
    usefulErrors.push({
      field: error.path,
      type: error.type,
      msg: `O campo ${error.path} está inválido`,
    });
  });

  return usefulErrors;
};

const validateData = async (dt, sch) => {
  const options = {
    presence: 'required',
    abortEarly: false,
    allowUnknown: false,
    // stripUnknown: { arrays: true, objects: true },
  };
  return await Joi.validate(dt, sch, options);
};

const joiValidate = schema => {
  const validate = async (req, res, next) => {
    try {
      const items = { ...req.body, ...req.params, ...req.query, ...req.form };

      const body = await validateData(items, schema);

      req.body = body;
      next();
    } catch (err) {
      if (err.details) {
        err = buildUsefulErrorObject(err.details);
      }
      res
        .status(406)
        .send({ message: err.message || 'Payload Inválido', error: err });
      return false;
    }
  };

  return validate;
};

export default {
  joiValidate,
};
