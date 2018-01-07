import React from 'react';

var Login = (props) => (
	<div>
	  <div>
	    <h4>Login</h4>
	    username: <input onChange={props.usernameChange}/>
	    <br/>
	    password: <input onChange={props.passwordChange}/>
	    <br/>
	    <br/>
	    <button onClick={() => {props.authenticate('/login')}}>login</button>
	  </div>
   
    <br/>
	  <a href="https://www.youtube.com/watch?v=oHg5SJYRHA0" onClick={() => alert('Sorry we have no password recover system.')} >Forgot your password?</a>

	  <div>
	    <h4>Signup</h4>
	    username: <input onChange={props.usernameChange}/>
	    <br/>
	    password: <input onChange={props.passwordChange}/>
	    <br/>
	    <br/>
	    <button onClick={() => {props.authenticate('/signup')}}>create account</button>
	  </div>
  </div>
)

export default Login;