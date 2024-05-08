require('dotenv').config();
const  mongoose = require('mongoose');
const app = require('./app');
const http = require('http');
const config = require('./config/config.json');
const server=http.createServer(app);
const PORT = process.env.PORT || 8500;
const DBConnection = process.env.DATABASE || config.database.mongodb.local


server.listen(PORT,()=>{
    mongoose.connect(DBConnection).then(()=>{
        console.log("Connection Created",PORT)
    }).catch((error)=>{
        console.log("error in connecting with DB :",error)
    })
})