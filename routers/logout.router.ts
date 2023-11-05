import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import {UserRecord} from "../records/user.record";
import {ValidationError} from "../utils/errors";


export const logoutRouter = express.Router();

logoutRouter
    .get('/logout', async (req, res)=>{

        const jwtCookie = req.cookies.jwt_token;

        //checking if cookie exists in database if yes then remove it from database and res.cookie 'jwt_token','' to empty string

        const data = await UserRecord.checkIfJWTExists(jwtCookie);

        const jwtExistInDataBase = data !== undefined;

        // console.log(jwtExistInDataBase, 'result from db jwt existing');

        if (jwtExistInDataBase) {
            // removing token
            res.cookie('jwt_token', '').json('logout');
        } else {
            throw new ValidationError('there is some issue with tokens ;/');
        }
    })