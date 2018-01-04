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
	    <button onClick={props.submitLogin}>login</button>
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
	    <button onClick={props.submitSignin}>create account</button>
	  </div>
  </div>
)

export default Login;
