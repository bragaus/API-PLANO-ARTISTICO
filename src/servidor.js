require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const router = require('./rotas');
const morgan = require('morgan');
const { errors } = require('celebrate');
const passport = require('passport');
require('./autenticacao')(passport);

const app = express();
const server = http.Server(app);

// Lib de Logs
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({credentials: true, origin: process.env.ORIGIN }))
app.use(router);
app.use(errors());

porto = process.env.PORT || 3000;
server.listen(porto);

console.log('navegando no porto: ' + porto)
