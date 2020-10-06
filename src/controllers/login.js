import jwt from 'jsonwebtoken';
import CentaurusModel from 'models/centaurus';
import UserModel from 'models/user';

export const login = async req => {
  const { cpf, senha } = req.body;
  try {
    // let user = await UserModel.findOne({
    //   cpf: req.body.cpf,
    //   senha: req.body.senha,
    // });

    const user = await UserModel.findOne({
      cpf,
    });

    if (!user) {
      throw {
        code: 401,
        message: 'Cpf/Cnpj ou senha inválidos',
      };
    }
    const isMatch = await user.comparePassword(senha, user.senha);

    if (isMatch) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.SALT,
        {
          expiresIn: 2400, // expires in 40min
        }
      );

      // ADICIONAR LOGICA TERMOS

      return {
        token,
        user: user._doc,
      };
    } else {
      throw {
        code: 400,
        message: 'Cpf/Cnpj ou senha inválidos',
      };
    }
  } catch (e) {
    throw {
      code: e.code || e.status || 404,
      message: e.message || 'Cpf/Cnpj ou senha inválidos',
    };
  }
};
