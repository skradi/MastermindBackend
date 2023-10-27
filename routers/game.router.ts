import express from "express";
import {UserRecord} from "../records/user.record";
import {newGameRandomizer} from "../utils/newGameRandomizer";


export const gameRouter = express.Router();


gameRouter
    .get('/game', async (req, res) => {

        console.log('jwt_token', req.cookies.jwt_token);

        if (req.cookies.jwt_token === '') {
            res.json('you are not login');
            return;
        }

        const logged = await UserRecord.checkIfJWTExists(req.cookies.jwt_token);
        console.log(logged, 'user from database');

        const numbersForGame = newGameRandomizer();

        await UserRecord.startNewGame(logged.username, numbersForGame);

        res.json('new game started');
    });