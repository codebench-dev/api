'use strict';
require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const app = express();

routes(app);

const API_PORT =  process.env.PORT || process.env.API_PORT;
app.listen(API_PORT, () => console.log(`CodeBench Started on port ${API_PORT}...`));