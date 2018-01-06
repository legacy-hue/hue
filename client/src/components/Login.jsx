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
	    <button onClick={() => {props.submit('/login')}}>login</button>
	  </div>
   
    <br/>
	  <a href="">Forgot your password?</a>

	  <div>
	    <h4>Signup</h4>
	    username: <input onChange={props.usernameChange}/>
	    <br/>
	    password: <input onChange={props.passwordChange}/>
	    <br/>
	    <br/>
	    <button onClick={() => {props.submit('/signup')}}>create account</button>
	  </div>
  </div>
)

export default Login;
