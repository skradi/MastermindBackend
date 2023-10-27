import express from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import {UserRecord} from "../records/user.record";
import {ValidationError} from "../utils/errors";


export const logoutRouter = express.Router();

logoutRouter
    .get('/logout', async (req, res)=>{

        // console.log(req.cookies, 'logout endpoint')

        const jwtCookie = req.cookies.jwt_token;
        console.log(jwtCookie);

        //checking if cookie exists in database if yes then remove it from data base and res.cookie 'jwt_token','' to empty string

        const data = await UserRecord.checkIfJWTExists(jwtCookie);


        const jwtExistInDataBase = data !== undefined;

        console.log(jwtExistInDataBase);

        console.log(jwtExistInDataBase, 'result from db jwt existing');

        if (jwtExistInDataBase) {
            // remove token from , is it hmmm
            res.cookie('jwt_token', '').json('looooogout');
        } else {
            throw new ValidationError('there is some issue with tokens ;/');
        }
    })