import React from 'react'
import { Divider, Form, Label } from 'semantic-ui-react'

const Login = () => (
  <Form>
    <Form.Field inline>
      <input type='text' placeholder='Username' onChange={props.usernameChange}/>
      <Label basic color='red' pointing='left'>That name is taken!</Label>
    </Form.Field>
    <Divider />

    <Form.Field inline>
      <Label basic color='red' pointing='right'>Your password must be 6 characters or more</Label>
      <input type='password' placeholder='Password' onChange={props.passwordChange}/>
    </Form.Field>

    <button onClick={() => {props.authenticate('/login')}}>login</button>

  </Form>
)

export default Login;