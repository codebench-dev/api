import { sha256 } from 'js-sha256';
import { UserDao } from "../dao/user.dao";
import { Request, Response } from "express";
const jwt = require('jsonwebtoken');

export class AuthController {

    static async login(email: string, password: string, req: Request, res: Response) {
        const jwt_key = process.env.JWT_KEY || 'wonderfullkey';
        const user = await UserDao.getByEmail(email);

        if (user === null) {
            res.status(404).json({ message: 'Unknown user' } );
            return;
        }

        console.log(password)
        console.log(user.password)
        console.log(sha256(password))

        if (user.password == sha256(password)) {
            // JWT auth sign token
            jwt.sign({user}, jwt_key, {expiresIn: '1d'}, (err: any, token: any) => {
                console.log("INSIDE " + token);
                if (err){
                    res.status(500).json({ message: 'Failed to generate your token' } );
                    return;
                }
                res.status(200).json(token);
            });

        } else {
            res.status(403).json({ message: 'Passwords doesn\'t match' } );
        }
    }

}