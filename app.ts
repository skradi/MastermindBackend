import express, {json} from 'express';
import cors from 'cors';
import 'express-async-errors';
import {UserRecord} from "./records/user.record";
import {handleError} from "./utils/errors";
import {homeRouter} from "./routers/home.router";
import {registrationRouter} from "./routers/registration.router";
import {loginRouter} from "./routers/login.router";
import cookieParser from "cookie-parser";
import {logoutRouter} from "./routers/logout.router";
import {gameRouter} from "./routers/game.router";
import {checkRouter} from "./routers/check.router";


const app = express();

app.use(cookieParser());

app.use(json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));


app.use('/', homeRouter)

app.get('/test', async (req,res)=>{

    console.log(req.cookies, 'test endpoint');

    res.json('test');
})

app.get('/cookie', async (req, res)=>{
    console.log(req.cookies, 'cookie endpoint');
    res.cookie('ok','fgre').json('ko');
})


app.get('/user', async (req,res)=>{
    const testobj = {
        username: 'kok',
        password: '1234',
        email: 'cos@cos.com'
    }
    const user = new UserRecord(testobj);

    console.log(user);

    res.json(user);
});

app.get('/game', gameRouter);

app.post('/check', checkRouter);

app.get('/logout', logoutRouter);

app.post('/registration', registrationRouter);

app.post('/login', loginRouter);

app.use(handleError);

app.listen(3001, '0.0.0.0', ()=>{
    console.log("listening on port http://localhost:3001");
});