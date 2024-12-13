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

// Image Storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const upload = multer({storage:storage})

// Creating upload endpoint for images

app.use('/image/', express.static('upload/images'))

app.post("/upload", upload.single('product',(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
}))

app.listen(port,(error) => {
    if(!error) {
        console.log("Server running on port: " + port);
    }
    else
    {
        console.log("error: " + error);
    }
})