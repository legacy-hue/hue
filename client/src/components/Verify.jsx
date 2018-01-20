import React from 'react';
import { Divider, Form, Label, Button, Header } from 'semantic-ui-react';
import axios from 'axios';

class Verify extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isVerified: false,
      token: '',
      redirect: false
    }
  }

  componentDidMount() {
    const { history } = this.props;

    if (this.props.match.params.jwtToken) {
      axios.post('/verifyAccount', { jwtToken: this.props.match.params.jwtToken })
        .then(res => {
          if (res.data) {
            this.setState({ isVerified: true, token: this.props.match.params.jwtToken })
            setTimeout(() => {
                history.push('/');
            }, 3000)
          } else {
            alert('An error has occured. You may have taken too long to reset your email. Please try again.');
          }
        })
        .catch(err => console.log('Res err:', err));
    }
  }

  render() {
    return (
      <div className="ui center aligned segment" style={{ height: '40vh', paddingTop: '10vh' }}>
        {this.state.isVerified ? <Header as="h5">Succesfully Verified! Redirecting in 3 seconds.</Header> : 
          <Header as="h5">Verifying...</Header>}
      </div>
    );
  }
}

export default Verify;