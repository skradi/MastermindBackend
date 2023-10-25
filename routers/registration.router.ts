import express from "express";
import {UserRecord} from "../records/user.record";
import {ValidationError} from "../utils/errors";

export const registrationRouter = express.Router();

registrationRouter
    .post('/registration', async (req, res) => {
        try {
            console.log(req.body, 'req body');

            const testobj = {
                username: req.body.username,
                password: req.body.password
            }

            if (Object.keys(req.body).length !== 2) {
                res.status(400).json({error: 'Something went wrong, please try again'} );
            }

            const user = new UserRecord(testobj)

            console.log(user);

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