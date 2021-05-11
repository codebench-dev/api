import express from 'express';

const tryRoutes = require('./try.route')

module.exports = function (app: express.Application) {
    tryRoutes(app);
};
