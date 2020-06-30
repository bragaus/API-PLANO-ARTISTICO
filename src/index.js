require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const router = require('./routes'); 
const morgan = require('morgan');
const { errors } = require('celebrate');
const passport = require('passport');
require('./autorizacao')(passport);

const app = express();
const server = http.Server(app);

// Lib de Logs
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(router);
app.use(errors());
server.listen(3333);
