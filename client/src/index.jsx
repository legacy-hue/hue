import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import $ from 'jquery';

import Home from './components/Home.jsx'
import Login from './components/Login.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  submit(url) {
    $.ajax({
      url: url,
      type: 'POST',
      data: {username: this.state.username,
             password: this.state.password
            }
    })
    .done((res) => {
      console.log(res);
    })
    .fail((err) => {
      console.log('error: ', err);
    });
  }

  submitLogin() {
    this.submit('/login')
  }

  submitSignin() {
    this.submit('/signup')
  }

  usernameChange(input) {
    this.setState({
      username: input.target.value
    });
  }

  passwordChange(input) {
    this.setState({
      password: input.target.value
    });
  }

  render() {
  	return (
      <div>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" render={(props) => (
            <Login {...props} 
              submitLogin={this.submitLogin.bind(this)}
              submitSignin={this.submitSignin.bind(this)}  
              usernameChange={this.usernameChange.bind(this)}
              passwordChange={this.passwordChange.bind(this)}
            />
          )}/> 
        </Switch>
      </div>
  	)
  }

}

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'))



