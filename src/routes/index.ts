import express from 'express';

const tryRoutes = require('./try.route')
const authRoutes = require('./auth.route')

module.exports = function (app: express.Application) {
    tryRoutes(app);
    authRoutes(app);
};
