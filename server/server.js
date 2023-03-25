import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './router/route.js';
const app=express();
import {config} from 'dotenv'
import connect from './database/conn.js';

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
config();

app.use('/api',router);
//app port

const PORT=8080;
app.get('/',(req,res)=>{
    try{
        res.json("GetRequest")
    }catch(err){
        console.log(err);
    }
})
connect()
.then(()=>{
    try{
        app.listen(PORT,()=>{
            console.log("server connected",PORT)
        })
    }
    catch{
        console.log("server connection failed")
    }
}).catch((err)=>{
    console.log("connection to db failed")
})
