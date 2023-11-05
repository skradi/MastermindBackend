import express from "express";
import {UserRecord} from "../records/user.record";
import {newGameRandomizer} from "../utils/newGameRandomizer";


export const gameRouter = express.Router();


gameRouter
    .get('/game', async (req, res) => {

        if (req.cookies.jwt_token === '') {
            res.json('you are not logged in');
            return;
        }

        const logged = await UserRecord.checkIfJWTExists(req.cookies.jwt_token);

        const numbersForGame = newGameRandomizer();

        await UserRecord.startNewGame(logged.username, numbersForGame);

        res.json('new game started');
    });