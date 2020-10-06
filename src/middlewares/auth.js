import btoa from 'btoa';
import jwt from 'jsonwebtoken';

import UserModel from 'models/user';

export const basicAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Credenciais inexistentes' });
  }

  const reqAuth = req.headers.authorization.split(' ');

  if (reqAuth[0] && reqAuth[0].toLowerCase() === 'basic') {
    const auth = btoa(
      `${process.env.BASIC_AUTH_USER}:${process.env.BASIC_AUTH_PASSWORD}`
    );

    if (auth === reqAuth[1]) {
      return next();
    }
  }

  return res.status(401).send({ message: 'Credenciais inválidas' });
};

export const bearerAuth = async (req, res, next, salt = process.env.SALT) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Credenciais inexistentes' });
  }

  const authHeader = req.headers.authorization.split(' ');

  try {
    if (authHeader[0] && authHeader[0].toLowerCase() === 'bearer') {
      const auth = await jwt.verify(authHeader[1], salt);

      const user = await UserModel.findOne({ _id: auth.id });

      if (auth.id && user) {
        req.auth = {
          token: authHeader[1],
          user: user._doc,
        };

        return next();
      } else {
        throw {}; //force error
      }
    } else {
      throw {}; //force error
    }
  } catch (e) {
    console.log('[e auth]', e);
    let message = 'Credenciais inválidas';
    let status = 401;

    if (e.message === 'jwt expired') {
      message = 'Credenciais expiradas';
      status = 409;
    }
    return res.status(status).send({ message });
  }
};
