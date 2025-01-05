import express from "express";
import dotenv from 'dotenv';
import cors from 'cors'
import bodyParser from "body-parser";

import Connection from "./database/db.js";
import DefaultData from "./database/default.js";
import Router from "./routes/route.js"

const app = express(); //initializing express

dotenv.config();
app.use(cors());
app.use(bodyParser.json({ extended: true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', Router)

const PORT  = 8000;
const USERNAME= process.env.DB_USERNAME;
const PASSWORD= process.env.DB_PASSWORD;

Connection(USERNAME,PASSWORD);
app.listen(PORT , ()=> console.log(`Server is Running successfully on port ${PORT}`));

DefaultData();