//import express
const express = require('express');

//path
const path = require('path');

//app variable
const app=express();

//port
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({extended:true}))//req.body (undefined)
app.use(express.json())
app.use(express.static('public'));

//import apiroutes
require("./routes/apiRoute")(app);

//import html.js from routes folder
require('./routes/html')(app);




app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);


