import express, {json} from 'express';
import cors from 'cors';
import {UserRecord} from "./records/user.record";


const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use(json());

app.get('/', async (req,res)=>{
    res.json('gf');
})

app.get('/id', async (req,res)=> {

    const user = await UserRecord.getOne("1");

    console.log(user);

    res.json(user);
})


app.listen(3001, '0.0.0.0', ()=>{
    console.log("listening on port http://localhost:3001");
});