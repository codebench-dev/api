import express from "express";
import bodyParser = require('body-parser');
import {AuthController} from "../controllers/auth.controller";

module.exports = function (app: express.Application) {

    app.get('/api', async (req, res) => {
        res.status(200).json({ message: 'Welcome to CodeBench-API' });
    });

    app.post('/api/login', bodyParser.json(), async (req, res) => {
        const data = req.body;

        if (data.password == null || data.email == null) {
            res.status(400).json({message : 'You must provide your email and password to login'});
        }

        const response = await AuthController.login(data.email, data.password, req, res);

        res.send({ response: response});

    });


}
