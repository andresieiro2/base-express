import DB from './src/database';

import UserModel from './src/models/user';

require('dotenv-flow').config();

module.exports = async function() {
  await DB.connect();

  //remove user test
  await UserModel.findOneAndDelete({
    cpf: '4073324489',
  });

  //check and create a user fake
  const checkTestUser = await UserModel.findOne({
    cpf: '123123123',
  });

  if (!checkTestUser) {
    const newUserTeste = new UserModel({
      email: 'emailteste@teste.com',
      celular: '11 199999-9999',
      cpf: '123123123',
      ddd: '11',
      nome: 'Teste Usuario',
      data_aceite: new Date(),
    });

    await newUserTeste.save();
  }
};
