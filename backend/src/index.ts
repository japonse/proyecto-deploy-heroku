import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { createConnection } from "typeorm"; 
import masterRouter from './routes/index'; 

const app = express();

// angular bundle
//app.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'dist', 'angular-heroku')));
//"heroku-prebuild": "cd frontend && npm install",
console.log(path.join(__dirname, '..', 'dist_frontend', 'angular-heroku'));
console.log(path.join(__dirname, '..', 'dist_frontend', 'angular-heroku','index.html'));
app.use(express.static(path.join(__dirname, '..', 'dist_frontend', 'angular-heroku'))); 

// routes
app.use((req, res, next) => { // make CORS not complain
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use('/', masterRouter); // delegate route management to masterRoute
//app.get('/*', function(req,res) {res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'dist', 'angular-heroku','index.html'));});
app.get('/*', function(req,res) {res.sendFile(path.join(__dirname, '..', 'dist_frontend', 'angular-heroku','index.html'));});

// connect to the database 
createConnection().then((connection) => {
    if (connection === undefined) {
        app.get('*', function (req, res) { res.redirect('/error/dbconnection') }); // default route when DB connection fails
        throw new Error('Error connecting to database');
    } 
}).catch((error)=>{
    app.get('*', function (req, res) { res.redirect('/error/dbconnection') }); // default route when DB connection fails
    throw new Error('Error connecting to database');
});



// start the Express server
app.listen(process.env.PORT, () => {
    console.log(`server started at port: ${process.env.PORT}`);
});