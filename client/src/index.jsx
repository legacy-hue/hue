import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';

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

  submitLogin() {
    $.ajax({
      url: '/login',
      type: 'POST',
      data: {username: this.state.username,
             password: this.state.password
            }
    })
    .done(() => {
      console.log('post sent');
    })
    .fail((err) => {
      console.log('error: ', err);
    });
  }

  render() {
  	return (
  <div>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" render={(props) => 
        <Login {...props} submitLogin={this.submitLogin.bind(this)}/>
        //<Route exact path="/login" component={Login}/> 
      }/>
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

