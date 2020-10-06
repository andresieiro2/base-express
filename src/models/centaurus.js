import Model from 'models';

function allSettled(promises) {
  let wrappedPromises = promises.map(p => Promise.resolve(p)
    .then(
      val => ({ status: 'fulfilled', value: val }),
      err => ({ status: 'rejected', reason: err })));
  return Promise.all(wrappedPromises);
}

export default class extends Model {
  async checkRevenda(cpf) {
    try {
      const user = await this.callService(
        `${process.env.URL_CENTAURUS}/revenda/vendedores?cpf=${cpf}`,
        'GET'
      );

      return user;
    } catch (e) {
      throw e;
    }
  }

  async checkPap(cpf) {
    try {
      const user = await this.callService(
        `${process.env.URL_CENTAURUS}/pap/vendedores?cpf=${cpf}`,
        'GET'
      );

      return user;
    } catch (e) {
      throw e;
    }
  }

  async checkVarejo(cpf) {
    try {
      const user = await this.callService(
        `${process.env.URL_CENTAURUS}/varejo/vendedores?cpf=${cpf}`,
        'GET'
      );

      return user;
    } catch (e) {
      throw e;
    }
  }

  async checkUserOnAllServices(cpf) {
    const check = await allSettled([
      this.checkRevenda(cpf),
      this.checkPap(cpf),
      this.checkVarejo(cpf),
    ]);

    const revenda = check[0].value || {};
    const pap = check[1].value || {};
    const varejo = check[2].value || {};

    const userActive = revenda.cpf || pap.cpf || varejo.cpf;

    if (userActive) {
      return {
        ...revenda,
        ...pap,
        ...varejo,
      };
    } else {
      const data = check.map(errorItem => ({
        data: errorItem.reason.data,
        config: errorItem.reason.config,
      }));

      throw {
        data,
      };
    }
  }
}
