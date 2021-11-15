import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';

import User from '../schemas/user';

export default class Auth {
    constructor() { }
    //#region login
    async login(req: Request, res: Response) {
        let jwt = require("jsonwebtoken");
        try {
            const { email, password } = req.body;
            if (!(email && password)) {
                res.status(400).send("All input is required");
            }
            const user = await User.findOne({ email });
            if (user && (await bcrypt.compare(password, user.password))) {

                const token = jwt.sign(
                    { user_id: user._id, email },
                    "asdasdasd1201",
                    {
                        expiresIn: "2h",
                    }
                );


                user.token = token;
                res.cookie("userdata", user)

                return res.redirect('http://localhost/login');;
            }
            res.status(400).send("Invalid Credentials");
        } catch (err) {
            console.log(err);
        }
    }
    //#endregion

    //#region register
    async register(req: Request, res: Response) {
        let jwt = require("jsonwebtoken");
        try {
            const { username, email, password } = req.body;

            if (!(email && password && username)) {
                res.status(400).send("All input is required");
            }

            const oldUser = await User.findOne({ email });

            if (oldUser) {
                return res.status(409).send("User Already Exist. Please Login");
            }


            let encryptedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                username,
                email: email.toLowerCase(),
                password: encryptedPassword,
            });

            const token = jwt.sign(
                { user_id: user._id, email },
                "asdasdasd1201",
                {
                    expiresIn: "2h",
                }
            );
            res.cookie("userdata", user, { maxAge: 900000, httpOnly: true })
            user.token = token;
            return res.redirect('http://localhost/login');
        } catch (err) {
            console.log(err);
        }
    }
    //#endregion

    //#region logout
    async logout(req: Request, res: Response) {
        try {
            res.clearCookie("userdata")
            return res.redirect('http://localhost/login');
        } catch (err) {
            console.log(err);
        }
    }
    //#endregion
}
