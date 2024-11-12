import React from 'react'
import './css/LoginSignup.css'
export const LoginSignup = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign UP</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Your Name' />
          <input type="email" placeholder='Emali Address'/>
          <input type="password" placeholder='Password' />
          <button>Continue</button>
          <p className="loginsignup-login">Already have an account <span>Login Here</span></p>
          <div className="loginsignup-agree">
            <input type="checkbox" name='' id='' />
            <p>By Continuing, I agree to the terms and privacy policy.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
