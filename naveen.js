const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended : true}));  // to use body parser to get input from webpage

app.set("viewengine" , "ejs");   // telling our server to use ejs even tho we dont use it

var source= "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*?";  // password generated from this 
var length = 0
var password = []   // output variable

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

// homepage get
app.get("/" , function( req , res){
    res.render("homepage.ejs");
});

// homepage post result
app.post("/" , function( req , res){
    length = Number(req.body.length);  // we got length from user input

    // now logic for generating password

    for( var i = 0; i < length; i ++){
        // var randNum = Math.floor(Math.random(0 * 100) + 1); 
        // generates random number btw 1 & source file length
        let randNum = getRandomInt(source.length);
       password.push(source[randNum]);

    }
    res.send("<h1> password is </h1>" + password.join("")+"<br><br> <form action = '/' method = 'GET' ><button type = 'submit'>Return to home</button><form>");
    password = [];
});

// server init
app.listen( process.env.PORT || 3000 , function(){
    console.log("server listening on port 3000");
});