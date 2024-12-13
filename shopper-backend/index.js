const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

app.use(express.json());
app.use(cors());

//data base connection with mongoDB 

mongoose.connect("mongodb+srv://avindu:avindu12345678@cluster0.0kcf8.mongodb.net/e-commerce");

//API Creation

app.get("/",(req, res) => {
    res.send("express app is running")
})

app.listen(port,(error) => {
    if(!error) {
        console.log("Server running on port: " + port);
    }
    else
    {
        console.log("error: " + error);
    }
})