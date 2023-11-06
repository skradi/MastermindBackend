import express, {json} from 'express';
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/errors";
import {registrationRouter} from "./routers/registration.router";
import {loginRouter} from "./routers/login.router";
import cookieParser from "cookie-parser";
import {logoutRouter} from "./routers/logout.router";
import {gameRouter} from "./routers/game.router";
import {checkRouter} from "./routers/check.router";
import {config} from "./config/config";
import rateLimit from "express-rate-limit";

const app = express();

app.use(cookieParser());

app.use(json());

app.use(cors({
    origin: config.corsOrigin,
    credentials: true,
}));

app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    limit: 100, // Limit each IP to 100 requests per 'window' (here, per 15 minutes)
}))

app.get('/test', async (req,res)=>{
    res.json('test');
})

app.get('/game', gameRouter);

app.post('/check', checkRouter);

app.get('/logout', logoutRouter);

app.post('/registration', registrationRouter);

app.post('/login', loginRouter);

app.use(handleError);

app.listen(3001, '0.0.0.0', ()=>{
    console.log("listening on port http://localhost:3001");
});