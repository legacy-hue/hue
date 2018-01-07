import React from 'react';
import { Divider, Form, Label, Button, Header } from 'semantic-ui-react'

var Login = (props) => (
	<div class="ui one column stackable center aligned page grid">
	<Form>
		<Header as='h3'>Log In</Header>
	  <Form.Field inline>
	    <input onChange={props.usernameChange} placeholder='Username'/>
	  </Form.Field>
	  <Form.Field inline>
	    <input onChange={props.passwordChange} placeholder='Password'/>
	  </Form.Field>
	  <Button onClick={() => {props.authenticate('/login')}}>login</Button>
	<a href="https://www.youtube.com/watch?v=oHg5SJYRHA0" onClick={() => alert('Sorry this feature is still in development.')} >Forgot your password?</a>
		<Header as='h3'>Sign Up</Header>
	  <Form.Field inline>
	    <input onChange={props.usernameChange} placeholder='Username'/>
	  </Form.Field>
	  <Form.Field inline>
	    <input onChange={props.passwordChange} placeholder='Password'/>
	  </Form.Field>
	  <Button onClick={() => {props.authenticate('/signup')}}>create account</Button>
  </Form> 
  </div>
)

export default Login;

// add state to track if user is logged in or not
// update login state with authentication call
// use styled component to show or hide label based on state