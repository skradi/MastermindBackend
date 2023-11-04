import express from "express";
import {ValidationError} from "../utils/errors";
import {StringArray} from "../types/user-entity";
import {isReqBodyCorrect} from "../utils/reqBodyCheck";
import {UserRecord} from "../records/user.record";


export const checkRouter = express.Router();

checkRouter
    .post('/check', async (req, res) => {

        const loggedUser = await UserRecord.checkIfJWTExists(req.cookies.jwt_token);

        const arrayFromUser = req.body;

        isReqBodyCorrect(arrayFromUser);

        // checking game guess function
        const checkResults = () => {
            const colorMap = {
                'grey': 1,
                'green': 2,
                'red': 3,
                'blue': 4,
                'orange': 5,
                'purple': 6,
                'pink': 7,
                'yellow': 8
            };

            const numbers = arrayFromUser.map((color: string) => colorMap[color as keyof typeof colorMap]);

            const userGuessString = numbers.join('');

            console.log(userGuessString);
            console.log(loggedUser.game);

            // funkcja porownujaca stringi i zwracajaca dane
            function compareStrings(string1: string, string2: string) {

                let theSame = 0;
                let differentIndex = 0;
                let different = 0;

                for (let i = 0; i < string1.length; i++) {
                    if (string1[i] === string2[i]) {
                        theSame++;
                    } else if (string2.includes(string1[i])) {
                        differentIndex++;
                    } else {
                        different++;
                    }
                }

                return {
                    theSame,
                    differentIndex,
                    different
                };
            }

            return  compareStrings(userGuessString, loggedUser.game);
        }

        const hits = checkResults();
        console.log(hits);

        res.json(hits);
    });