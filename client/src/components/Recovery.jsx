import React from 'react';
import { Divider, Form, Label, Button, Header } from 'semantic-ui-react';
import axios from 'axios';

class Recovery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      emailSent: false
    };

    this.emailChange = this.emailChange.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
  }

  emailChange(e) {
    this.setState({email: e.target.value});
  }

  passwordChange(e) {
    this.setState({password: e.target.value});
  }

  onSubmitEmail(e) {
    e.preventDefault();
    console.log('Submitting email:', this.state.email);
    // const { history } = this.props;
    axios.post('/passwordRecovery', {email: this.state.email})
      .then(res => {
        console.log(res);
        if (typeof res.data === 'string') {
          alert(res.data);
        } else {
          console.log('Your name:', res.data.name);
        }
        this.setState({email: '', emailSent: true})
      })
      .catch(err => console.log(err));
  }

  onSubmitPassword(e) {
    
  }

  componentDidMount() {
    console.log('Will', this.props.match.params.jwtToken);
    if(this.props.match.params.jwtToken) {
      axios.post('/confirmName', this.props.match.params.jwtToken)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  }

  render() {
    if (this.props.match.params.jwtToken) {
      return (
        <div className="ui center aligned segment" style={{ height: '40vh', paddingTop: '10vh' }}>
          <Form id="recovery" onSubmit={this.onSubmitPassword}>
            <Header as="h5">Enter your new password</Header>
            <Form.Field inline>
              <input onChange={this.passwordChange} value={this.state.password} placeholder='email' />
            </Form.Field>
            <Form.Field inline>
              <Button type="submit">Submit</Button>
            </Form.Field>
          </Form>
        </div>
      )
    } else {
      return (
        <div className="ui center aligned segment" style={{height: '40vh', paddingTop: '10vh'}}>
          <Form id="recovery" onSubmit={this.onSubmitEmail}>
            <Header as="h2">Recover your Hue account</Header>
            <Header as="h5">Enter an email address</Header>
            <Form.Field inline>
              <input onChange={this.emailChange} value={this.state.email} placeholder='email' />
            </Form.Field>
            <Form.Field inline>
              <Button type="submit">Submit</Button>
            </Form.Field>
          </Form>
          {this.state.emailSent ? <Header as="h5">Recovery email has been sent! Check you email.</Header> : ''}
        </div>
      );
    }
  }
}

export default Recovery;