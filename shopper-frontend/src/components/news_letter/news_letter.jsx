import React from 'react'
import './news_letter.css'

export const NewsLetter = () => {
  return (
    <div className='news-letter'>
        <h1>Get Exclusive Offers on Your Email</h1>
        <p>Subscribe to our news letter and stay updated</p>
        <div>
            <input type="email" placeholder='Your Email Address' />
            <button>Subscribe</button>
        </div>
    </div>
  )
}
