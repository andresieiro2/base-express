import Joi from 'joi';

export const loginSchema = {
  cpf: Joi.string()
    // .regex(/[0-9]{3}[0-9]{3}[0-9]{3}[0-9]{2}$/)
    .required(),
  senha: Joi.string().required(),
};

export const checkUserSchema = {
  cpf: Joi.string()
    // .regex(/[0-9]{3}[0-9]{3}[0-9]{3}[0-9]{2}$/)
    .required(),
};
