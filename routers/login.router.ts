import express from "express";
import {UserRecord} from "../records/user.record";
import {ValidationError} from "../utils/errors";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
const salt = 10;

export const loginRouter = express.Router();

loginRouter
    .post('/login', async (req,res)=>{

        console.log(req.body, 'req body');
        console.log(req.cookies, 'req cookies from login endpoint ');

        try {
            if (Object.keys(req.body).length !== 2) {
                res.status(400).json({error: 'Something went wrong, please try again'} );
            }

            const data = await UserRecord.getOne(req.body.username);

            const isMatch = await bcrypt.compare(req.body.password, data.hashpassword);

            console.log(isMatch, 'is match');
            console.log(data, 'this is user who is trying to login (from database)')

            if (!isMatch) {
                throw new ValidationError('invalid password');
            }

            // let's make json web token for this user
            const nameOfUser = data.username;
            const token = jwt.sign({nameOfUser}, 'jwt-secret-key',{expiresIn: '1d'});
            console.log(token, 'token for user')

            // res.cookie('token', token ).json('gdzie to ciastko');
            data.token = token;

            await UserRecord.update(token, data.username);

            res.cookie('jwt_token', token).json({'token': token});

        } catch (error) {
            if (error instanceof ValidationError) {
                // Handle validation errors and send them to the frontend
                console.log(error);
                res.status(400).json({error: error.message});

            } else {
                // Handle other errors and send a general error response
                console.error('Error during login authentication:', error);
                res.status(500).json({error: 'Registration failed'});
            }
        }
    })