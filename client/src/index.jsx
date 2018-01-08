import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';

import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Submit from './components/Submit.jsx';
import EntryList from './components/EntryList.jsx';
import CommentList from './components/CommentList.jsx';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      title: '',
      url: '',
      text: '',
      entries: [],
      auth: false,
      currentEntry: -1
    }
  }

  componentDidMount() {
    this.getEntries()
    .then(data => this.setState({entries: data.data}));
  }

  getEntries(){
    return axios.get('/entries');
  }

  getComments(entryid){
    return axios.get('/comments', {
      params: {
        entryid: entryid
      }
    });
  }

  postEntry(user, title, url){
    axios.post('/entries', {
      title: this.state.title,
      url: this.state.url
    });
  }

  postComment(user, text, entryid){
    axios.post('/comments', {
      user: user,
      text: text,
      entryid: entryid
    });
  }

  // checks if a user has permission to post things (is logged in)
  authorize(res) {
    console.log('authorize: ', res.data)
    this.setState({
      auth: res.data
    })
  }

  // checks if a user is who they say they are (verifies username & password)
  authenticate(url) {
    axios.post(url, { username: this.state.username, password: this.state.password })
    //.then((res) => { alert(res.data)});
    .then((res) => { axios.get('/submit').then((res) => { this.authorize(res)})});
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

  titleChange(input) {
    this.setState({
      title: input.target.value
    });
  }

  urlChange(input) {
    this.setState({
      url: input.target.value
    });
  }

  textChange(input) {
    this.setState({
      text: input.target.value
    });
  }

  isAuthenticated(){
    console.log('auth state: ', this.state.auth);
    return this.state.auth
  }

  setEntry(entryid){
    this.setState({
      currentEntry: entryid
    });
  }

  render() {
  	return (
      <div>
        <Switch>
          <Route exact path="/" render={(props) => (
            <Home {...props}
              data = {this.state.entries}
              setEntry = {this.setEntry.bind(this)}
              authorize={this.authorize.bind(this)}
              authenticate={this.authenticate.bind(this)}
            />
          )}/>
          <Route exact path="/login" render={(props) => (
            <Login {...props} 
              authenticate={this.authenticate.bind(this)}
              usernameChange={this.usernameChange.bind(this)}
              passwordChange={this.passwordChange.bind(this)}
            />
          )}/> 
          <Route exact path="/submit" render={(props) => (
            this.isAuthenticated() === true
            ? <Submit {...props} 
              submit={this.postEntry.bind(this)}
              titleChange={this.titleChange.bind(this)}
              urlChange={this.urlChange.bind(this)}
              textChange={this.textChange.bind(this)}
            />
            : <Redirect to='/login' />
          )}/> 
          <Route exact path="/thread" render={(props) => (
            <CommentList {...props}
              entry={this.state.currentEntry}
              getComments={this.getComments.bind(this)}
            />
          )}/> 
        </Switch>
      </div>
  	)
  }

}

ReactDOM.render((
  <HashRouter>
    <App />
  </HashRouter>
), document.getElementById('app'))
