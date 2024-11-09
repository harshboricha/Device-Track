const express = require ('express')
const app = express();
const http=require("http");// we have to use the http 
const path = require('path');

const socketio=require("socket.io")
const server=http.createServer(app);// to create a server we have to use this method

const io =socketio(server)
//this much is the code we have to do for the socketio setup
//we have to connect the server with the socket io 

app.set("view engine","ejs")
//set up view engine

app.set(express.static(path.join(__dirname,"public")));
// created this so we can store all our assets here 
app.get("/",function(req,res){
    res.send("hey")
});

server.listen(3000)