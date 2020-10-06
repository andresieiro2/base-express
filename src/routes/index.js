import express from 'express';
import loginRoutes from './login';

import { basicAuth, bearerAuth } from 'middlewares/auth';

const routes = {
  init: app => {
    // //rotas

    app.use('/login', /*basicAuth,*/ /*bearerAuth,*/ loginRoutes());

    // default routes
    app.get('/', (request, response) => {
      response
        .status(200)
        .send(
          `Pagina inicial ${process.env.NODE_ENV} API:${process.env.URL_SERVICES}`
        );
    });

    //docs
    app.use('/docs', express.static('public/docs'));

    app.get('*', (request, response) => {
      response.status(404).send(`Esta página não foi encontrada`);
    });
  },
};

export default routes;
