import React, { useState } from 'react'
import './css/LoginSignup.css'
export const LoginSignup = () => {

  const [state,setState] = useState("Sign up");
  const[formData,setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async () => {
    console.log("Login", formData);
  
    try {
      const response = await fetch('https://shopper-backend-j10r.onrender.com/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json', // Correct Accept header
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        // Handle HTTP errors
        const errorData = await response.json();
        alert(errorData.errors || "Invalid email or password.");
        return;
      }
  
      const responseData = await response.json();
  
      if (responseData.success && responseData.token) {
        // Login successful
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace("/");
      } else {
        // Handle invalid credentials or other issues
        alert(responseData.errors || "Login failed. Please try again.");
      }
    } catch (error) {
      // Handle network errors or unexpected issues
      console.error("An error occurred during login:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  

  
  const signup = async () => {
    console.log("signup", formData);
    let responseData;
    await fetch('https://shopper-backend-j10r.onrender.com/signup', {
      method: 'POST',
      headers: {
        Accept:'application/form-data',
        'content-type': 'application/json',
      },
      body:JSON.stringify(formData)
    }).then((response)=>response.json()).then((data)=>responseData=data);
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.errors)
    }
    
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state==="Sign up"?<input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' />:<></>}
          <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder='Emali Address'/>
          <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
          <button onClick={()=>{state==="Login"?login():signup()}}>{state==="Login"?"Login":"Signup"}</button>
          {state==="Sign up"?<p className="loginsignup-login">Already have an account <span onClick={()=>{setState("Login")}}>Login Here</span></p>:<p className="loginsignup-login">Dont have an account <span onClick={()=>{setState("Sign up")}}>Create new account</span></p>}
          <div className="loginsignup-agree">
            <input type="checkbox" name='' id='' />
            <p>By Continuing, I agree to the terms and privacy policy.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
