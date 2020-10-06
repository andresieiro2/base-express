import express from 'express';
import Joi from 'middlewares/joi';
import * as schemas from 'schemas/login';

import * as Controller from 'controllers/login';

import routerHelper from 'utils/routerHelper';

const loginRoutes = () => {
  const router = express.Router();

  router.post(
    '/',
    Joi.joiValidate(schemas.loginSchema),
    routerHelper(Controller.login)
  );

  return router;
};

export default loginRoutes;
