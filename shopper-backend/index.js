const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { type } = require('os');

app.use(express.json());
app.use(cors());

//data base connection with mongoDB 

mongoose.connect("mongodb+srv://avindu:avindu12345678@cluster0.0kcf8.mongodb.net/e-commerce");

//----------API Creation-----------------   Test-Thunder client  --------------------------------

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

app.use('/images/', express.static('upload/images'))

// app.post("/upload", upload.single('product',(req,res)=>{
//     res.json({
//         success:1,
//         image_url:`http://localhost:${port}/images/${req.file.filename}`
//     })
// }))

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});


// Schema for creating products

const Products = mongoose.model("Product", {
    id:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default:Date.now,
    },
    available:{
        type: Boolean,
        default: true,
    },
})


// API for creating products

app.post('/addproduct', async (req, res) => {
    let products = await Products.find({})
    let id;
    if(products.length>0) 
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else
    {
        id=1;
    }
    const product = new Products({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product)
    await product.save();
    console.log("Product Created");
    res.json({
        success:true,
        name:req.body.name,
    })
})


// API for deleting products

app.post('/removeproduct', async (req, res) =>{
    await Products.findOneAndDelete({id:req.body.id});
    console.log("Product Removed");
    res.json({
        success:true,
        name:req.body.name,
    })
})


// API for getting all products

app.get('/allproducts', async (req, res) =>{
    let products = await Products.find({});
    console.log("All Products Fetched");
    res.send(products);
})


app.listen(port,(error) => {
    if(!error) {
        console.log("Server Running on Port: " + port);
    }
    else
    {
        console.log("error: " + error);
    }
})