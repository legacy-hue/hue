import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';

import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import EntryList from './components.EntryList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      entries: []
    }
  }

  componentDidMount() {
    // Test functions, you can remove when you get here
    // 
    // this.postEntry('user', 'test post request', 'www.4chan.org');
    // this.postComment('user', 'test comment post', '1');
    // this.getComments(1)
    // .then(data => console.log(data.data));

    this.getEntries()
    .then(data => this.setState({entries: data.data}));
  }

  getEntries(){
    return axios.get('/entries');
  }

  getComments(entryid){
    return axios.get('/entries', {
      params: {
        entryid: entryid
      }
    });
  }

  postEntry(user, title, url){
    axios.post('/entries', {
      user: user,
      title: title,
      url: url
    });
  }

  postComment(user, text, entryid){
    axios.post('/comments', {
      user: user,
      text: text,
      entryid: entryid
    });
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

  submitLogout() {
    this.submit('/logout');
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
          <Route exact path="/" render={(props) => (
            <Home {...props}
              submitLogout={this.submitLogout.bind(this)}
            />
          )}/>
          <Route exact path="/login" render={(props) => (
            <Login {...props} 
              submitLogin={this.submit.bind(this)}
              submitSignin={this.submit.bind(this)}  
              usernameChange={this.usernameChange.bind(this)}
              passwordChange={this.passwordChange.bind(this)}
            />
          )}/> 
        </Switch>
      </div>
      <div>
        <h1>entries</h1>
        <div>
          <EntryList data = {this.state.entries} />
        </div>
      </div>
  	)
  }

}

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'))



