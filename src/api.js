import 'babel-polyfill';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';

import formidable from 'formidable';

import routes from './routes';
import DB from './database';

require('dotenv-flow').config();

DB.connect();

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);

// fix requisicoes com form
app.use(async (req, res, next) => {
  if (
    req.headers['content-type'] &&
    req.headers['content-type'].indexOf('form') > -1
  ) {
    const form = formidable({ multiples: true });

    try {
      await new Promise(async resolve => {
        await form.parse(req, (err, fields, files) => {
          if (err) {
            next(err);
            return;
          }

          req.form = { ...fields, ...files };
          resolve();
        });
      });
    } catch (e) {
      //console.log(e);
      //req sem form
    }
  }
  next();
});

// fix requisicoes sem body
app.use(async (req, res, next) => {
  if (
    req.headers['content-type'] &&
    req.headers['content-type'].indexOf('form') === -1
  ) {
    try {
      req.body = await JSON.parse(req.body);
    } catch (e) {
      // console.log(e);
      //req sem body
    }
  }

  next();
});

routes.init(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
