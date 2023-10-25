import express, {json} from 'express';
import cors from 'cors';
import 'express-async-errors';
import {UserRecord} from "./records/user.record";
import {handleError} from "./utils/errors";
import {homeRouter} from "./routers/home.router";
import {registrationRouter} from "./routers/registration.router";


const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(json());

app.use('/', homeRouter)

app.get('/test', async (req,res)=>{
    res.json('test');
})

app.get('/id', async (req,res)=> {

    const user = await UserRecord.getOne("1");

    console.log(user);

    res.json(user);
})

app.get('/user', async (req,res)=>{
    const testobj = {
        username: 'kok',
        password: '1234'
    }
    const user = new UserRecord(testobj);

    res.json(user);
})

app.post('/registration', registrationRouter);

app.use(handleError);

app.listen(3001, '0.0.0.0', ()=>{
    console.log("listening on port http://localhost:3001");
});