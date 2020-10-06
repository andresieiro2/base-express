const request = require('supertest');
const express = require('express');
import bodyParser from 'body-parser';

import routes from 'routes';
import DB from '../database';

DB.connect();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes.init(app);
const API = request(app);

export default API;
