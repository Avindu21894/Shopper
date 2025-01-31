const port = process.env.PORT || 4000;
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

// Schema for User Model

const Users = mongoose.model('Users', {
    name:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type: Date,
        default: Date.now,
    }
})

// Creating endpoint for Registering the user

app.post('/signup', async (req, res) => {
    try {
        // Check if a user already exists with the provided email
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "Existing user found with the same email address" });
        }

        // Initialize a cart object
        let cart = {};
        for (let index = 0; index < 300; index++) {
            cart[index] = 0; // Corrected cart key to use `index` instead of `i`
        }

        // Create a new user
        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password, // Plain text password (ensure this is intentional)
            cartData: cart,
        });

        await user.save();

        // Prepare JWT payload
        const data = {
            user: {
                id: user.id,
            },
        };

        // Sign JWT
        const token = jwt.sign(data, 'secret_ecom'); // Consider moving 'secret_ecom' to environment variables
        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, errors: "Internal server error" });
    }
});

// create endpoint for user login

app.post('/login', async (req, res) => {
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success:'true',token});
        }
        else{
            res.json({success:'false', errors:"Wrong Password"});
        }
    }
    else{
        res.json({success:'false', errors:"wrong email address"});
    }
})


// create endpoint for newcollection data

app.get('/newcollections', async (req, res) => {
    let products = await Products.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New Collection fetched");
    res.send(newcollection);    
})

// create endpoint for popular in women section 

app.get('/popularinwomen',async (req,res)=>{
    let products = await Products.find({category:"women"});
    let popularinwomen = products.slice(0,4);
    console.log("Popular in women section fetched");
    res.send(popularinwomen);
    
})

// create middleware to fetch user 

const fetchUser = async (req, res, next) =>{
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
    }
    else{
        try {
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:"Please authenticate using a valid token"});
        }
    }
}

// create endpoint for adding products in cart data 

app.post('/addtocart',fetchUser,async(req,res)=>{
    console.log("Added",req.body.itemId);
    let userdata = await Users.findOne({_id:req.user.id});
    userdata.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userdata.cartData});
    res.send("Added")
})

// create endpoint to remove products in cart data

app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log("Removed",req.body.itemId);
    let userdata = await Users.findOne({_id:req.user.id});
    if(userdata.cartData[req.body.itemId]>0)
    userdata.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userdata.cartData});
    res.send("Removed")
})


// create endpoint to get cart data 

// app.post('/getcart',fetchUser, async (req,res)=>{
//     console.log("Get cart");
//     let userdata = await Users.findOne({_id:req.user.id})
//     res.json(userdata.cartData);
// })

// create endpoint to get cart data
app.post('/getcart', fetchUser, async (req, res) => {
    try {
        let userdata = await Users.findOne({ _id: req.user.id });
        if (!userdata) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        console.log("Cart Data fetched");
        res.json(userdata.cartData);
    } catch (error) {
        console.error("Error fetching cart data:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
})

// Start server
app.listen(port,(error) => {
    if(!error) {
        console.log("Server Running on Port: " + port);
    }
    else
    {
        console.log("error: " + error);
    }
})