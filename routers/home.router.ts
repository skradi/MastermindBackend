import express from "express";


export const homeRouter = express.Router();

homeRouter
    .get('/', async (req, res) => {
        console.log(req.cookies);
        res.json('hello5');
    })