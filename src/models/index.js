import axios from 'axios';

export default class Model {
  constructor(req) {
    // if (!req) {
    //   throw {
    //     message: 'Req nao foi definido',
    //     status: 400,
    //   };
    // }
    // this.req = req;
    this.axios = axios.create();
  }

  async callService(url, method, headers = {}, body = {}) {
    const response = await this.axios({
      url,
      method,
      data: body,
      headers,
    }).catch(error => {
      if (process.env.LOG_SERVICE) {
        console.log('error on axios', error);
      }
      throw error.response;
    });

    return response.data;
  }

  // downloadService(url, method, params, customheader = {}) {
  //   return downloadService(url, method, params, customheader, this.req);
  // }

  // callForm(url, method, params, customheader = {}) {
  //   return callForm(url, method, params, customheader, this.req);
  // }
}
