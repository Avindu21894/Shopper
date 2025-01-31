import React, { useEffect, useState } from 'react'
import './newCollections.css'
import Item from '../item/item'

export const NewCollections = () => {

  const[new_collection,setNew_Collection] = useState([]);

useEffect(() =>{
  fetch('http://localhost:4000/newCollections')
  .then((response) => response.json())
  .then((data)=>setNew_Collection(data))
},[])

  return (
    <div className='new-collections'>
        <h1>New Collections</h1>
        <hr />
        <div className="collections">
            {new_collection.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}
