import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/shop_context'
import { useParams } from 'react-router-dom';
import Breadcrum  from '../components/breadcrums/breadcrum';
import ProductDisplay from '../components/productdisplay/productdisplay';
import { DescriptionBox } from '../components/descriptionbox/descriptionbox';
import { RelatedProducts } from '../components/relatedproducts/relatedproducts';

export const Product = () => {
  const {all_products} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_products.find((e)=>e.id === Number(productId));
  return (
    <div>
        <Breadcrum product={product}/>
        <ProductDisplay product={product} />
        <DescriptionBox />
        <RelatedProducts/>
    </div>
  )
}
