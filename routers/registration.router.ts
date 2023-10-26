import express from "express";
import {UserRecord, UserRecordResults} from "../records/user.record";
import {ValidationError} from "../utils/errors";

export const registrationRouter = express.Router();

registrationRouter
    .post('/registration', async (req, res) => {

            console.log(req.body, 'req body');
            console.log(req.cookies, 'registration endpoint');

        try {
            if (Object.keys(req.body).length !== 3) {
                res.status(400).json({error: 'Something went wrong, please try again'} );
            }

            const testobj = {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            }


            const usernameExists = await UserRecord.checkIfExists(req.body.username);

            if (usernameExists) {
                throw new ValidationError('Sorry, that username is already in use. Please choose a different username.')
            }

            const user = new UserRecord(testobj)

            console.log(user, 'userrrrr');

            await user.insert();

            res.json(user.username);

        } catch (error) {
            if (error instanceof ValidationError) {
                // Handle validation errors and send them to the frontend
                console.log(error);
                res.status(400).json({error: error.message});

            } else {
                // Handle other errors and send a general error response
                console.error('Error during registration:', error);
                res.status(500).json({error: 'Registration failed'});
            }
        }
    })