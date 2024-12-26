import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
    const [image, setImage] = useState(null); // Initialize as null instead of false
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]); // Set the file object
    };

    const changeHandler = (e) => {
        setProductDetails({
            ...productDetails,
            [e.target.name]: e.target.value
        });
    };

    const Add_Product = async () => {
        console.log(productDetails);

        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image); // Append the image file correctly

        // Send POST request to backend
        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            body: formData,
        })
        .then((resp) => resp.json())
        .then((data) => {
            responseData = data;
        });

        // Check if the image upload was successful
        // if (responseData.success) {
        //     product.image = responseData.image_url; // Set image URL in the product details
        //     console.log(product);
        //     await fetch('http://localhost:4000/addproduct',{
        //         method: 'POST',
        //         headers:{
        //             Accept: 'application/json',
        //             'Content-type': 'application/json',
        //         },
        //         body: JSON.stringify(product),
        //     }).then((resp)=>resp.json()).then(()=>{
        //         data.success?alert("Product Added Successfully"):alert("Product Adding Failed")
        //     })
        // } else {
        //     console.error('Image upload failed');
        // }

        if (responseData.success) {
            product.image = responseData.image_url; // Set image URL in the product details
            console.log(product);
        
            try {
                const response = await fetch('http://localhost:4000/addproduct', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                });
        
                const data = await response.json();
        
                if (data.success) {
                    alert("Product Added Successfully");
                } else {
                    alert("Product Adding Failed");
                }
            } catch (error) {
                console.error('Error in adding product:', error);
                alert('Failed to add product');
            }
        } else {
            console.error('Image upload failed');
        }
        
    };

    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input
                    value={productDetails.name}
                    onChange={changeHandler}
                    type="text"
                    name="name"
                    placeholder='Type here'
                />
            </div>

            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input
                        value={productDetails.old_price}
                        onChange={changeHandler}
                        type="text"
                        name='old_price'
                        placeholder='Type here'
                    />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input
                        value={productDetails.new_price}
                        onChange={changeHandler}
                        type="text"
                        name='new_price'
                        placeholder='Type here'
                    />
                </div>
            </div>

            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select
                    value={productDetails.category}
                    onChange={changeHandler}
                    name="category"
                    className='addproduct-selector'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kids</option>
                </select>
            </div>

            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img
                        src={image ? URL.createObjectURL(image) : upload_area}
                        className='addproduct-thumbnail-image'
                        alt="Upload Preview"
                    />
                </label>
                <input
                    onChange={imageHandler}
                    type="file"
                    name='image'
                    id='file-input'
                    hidden
                />
            </div>

            <button onClick={Add_Product} className='addproduct-button'>
                ADD
            </button>
        </div>
    );
};

export default AddProduct;
