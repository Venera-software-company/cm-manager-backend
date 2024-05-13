import { Request, Response } from 'express';

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User";

import "dotenv/config";

const SEVEN_DAYS_IN_MS = 604800000;

export default {
    async add(req: Request, res: Response) {
        try {
            const { name, user, password, email, phoneNumber } = req.body;
            const userExists = await User.find({ user });

            if(userExists.length > 0) return res.status(400).json({ message: 'Usuário já existe!' });

            const hashedPassword = await bcrypt.hash(password, 10);
            
            await User.create({ 
                name,
                user,
                email,
                phoneNumber,
                password: hashedPassword,
                settings: { theme: 'dark' }
            });

            res.status(200).json({ message: 'User created successfully!' });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: err });
        }
    },
    async login(req: Request, res: Response) {
        try {
            const { user, password } = req.body;

            const getUser = await User.find({ user });
            // let TFAEnabled = false;

            if(!getUser.length) {
                return res.status(401).json({ message: 'Combinação de usuário e senha inválida!' });
            }

            const { _id, name, settings } = getUser[0];

            // if(TFAStatus) {
            //     const TFAStatus = await TFA.find({ _id: getUser[0]?.TFAStatus });
            //     TFAEnabled = TFAStatus[0].verified;
            // }

            const passwordDB = getUser[0].password;
            const comparePasswords = await bcrypt.compare(password, passwordDB);

            if(comparePasswords) {
                const payload = {
                    iss: "login-form",
                    sub: { _id, name },
                    exp: Math.floor((Date.now() / 1000) + SEVEN_DAYS_IN_MS),
                };

                const token = jwt.sign(
                    payload, 
                    process.env.SECRET as string, 
                    { algorithm: 'HS512' }
                );

                return res.status(200).json({ token, _id, name, settings });
            }

            return res.status(401).json({ message: 'Combinação de usuário e senha inválida!' });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: err });
        }
    },
    async verifyIfTokenIsValid(req: Request, res: Response) {
        try {
            const { token } = req.body;
            const { sub } = jwt.decode(token) as any;

            const findUser = await User.findById(sub._id);

            const userDataObj = {
                ...sub,
                TFAEnabled: findUser.TFAStatus ? true : false,
                settings: { ...findUser.settings }
            };

            return res.status(200).json(userDataObj);
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: err });
        }
    },
    async verifyUser(req: Request, res: Response) {
        try {
            const { password, _id } = req.body;
            const findUser = await User.findById({ _id });

            if(!findUser?._id) return res.status(400).json({ message: 'User not found!' });

            const userPassDB = findUser.password;
            const comparePass = await bcrypt.compare( password, userPassDB );

            if(comparePass) res.status(200).json({ message: 'Authenticated' });
            else res.status(400).json({ message: 'Wrong password, please try again!' });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'User not authenticated' });
        }
    },
    async changePassword(req: Request, res: Response) {
        try {
            const { userId, password } = req.body;
            const getUser = await User.find({ _id: userId });
            
            if(getUser.length === 0) return res.status(400).json({ message: 'User not found, please try again or later!' });

            const hashedPass = await bcrypt.hash(password, 10);
            await User.findOneAndUpdate({ _id: userId }, { password: hashedPass });

            res.status(200).json({ message: 'Password changed!'});
        } catch (err) {
           res.status(400).json({ message: err });
        }
    },
    async changeAppTheme(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { theme } = req.body;

            const getUserData = await User.findById(id);

            await User.findByIdAndUpdate({ _id: id }, {
                settings: {
                    ...getUserData.settings,
                    theme
                }
            });

            return res.status(200).json({ message: "Updated!" });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: err });
        }
    },
}