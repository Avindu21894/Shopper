import React, { useContext } from 'react'
import './productdisplay.css'
import star_icon from '../assets/star_icon.png'
import stardull_icon from '../assets/star_dull_icon.png'
import { ShopContext } from '../../context/shop_context'

const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-imagelist">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productdisplay-image">
                <img className='productdisplay-main-img' src={product.image} alt="" />
            </div>
        </div>

        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-stars">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={stardull_icon} alt="" />
                <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-old">${product.old_price}</div>
                <div className="productdisplay-right-price-new">${product.new_price}</div>
            </div>
            <div className="productdisplay-right-description">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe perspiciatis totam aliquid dolorum modi sed sequi veritatis suscipit minima itaque a laborum officiis non mollitia cum dolorem voluptatum, impedit quaerat?</div>
            <div className="productdisplay-right-size">
                <h1>Select Size</h1>
                <div className="productdisplay-right-sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div>
            <button onClick={()=>{addToCart(product.id)}}>Add To Cart</button>
            {/* <p className='productdisplay-right-category'><span>category :</span>Women , T-Shirt, Crop-Top</p>
            <p className='productdisplay-right-category'><span>Tags :</span>Modern, Latest</p> */}
        </div>
    </div>
  )
}

export default ProductDisplay;