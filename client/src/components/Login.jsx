import React from 'react';
import { Divider, Form, Label, Button, Header } from 'semantic-ui-react'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmitLogin.bind(this);
  }

  onSubmitLogin(e) {
    e.preventDefault();
    const { history } = this.props;
    this.props.authenticate(e.target.id).then((res) => {
      if ((res.data === 'Login successful')
         || (res.data === 'Congratulations! Welcome to hue.'))
        history.push('/');
    });
  }

  componentDidMount() {
    this.props.authorize()
  }

  render() {
    return (
      <div className="ui center aligned segment">
        <Form id="login" onSubmit={this.onSubmit}>
          <Header as='h3'>Log In</Header>
          <Form.Field inline>
            <input onChange={this.props.usernameChange} placeholder='Username' />
          </Form.Field>
          <Form.Field inline>
            <input onChange={this.props.passwordChange} placeholder='Password' type='password' />
          </Form.Field>
          <Form.Field inline>
            <Button type="submit">Login</Button>
          </Form.Field>
        </Form>
        <br></br>

        <Form id="signup" onSubmit={this.onSubmit}>
          <Header as='h3'>Sign Up</Header>
          <Form.Field inline>
            <input onChange={this.props.usernameChange} placeholder='Username' />
          </Form.Field>
          <Form.Field inline>
            <input onChange={this.props.passwordChange} placeholder='Password' type='password' />
          </Form.Field>
          <Form.Field inline>
            <Button type="submit">Create Account</Button>
          </Form.Field>
        </Form>
      </div>
    );
  }
}
export default Login;

// display messages for user:
// add state to track if user is logged in or not
// update login state with authentication call
// use styled component to show or hide label based on state

// add form controls
