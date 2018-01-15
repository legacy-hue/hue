import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import styles from 'styled-components';
import { Divider, Form, Label, Button, Header, Menu } from 'semantic-ui-react'
import { BrowserRouter, HashRouter, Link, Switch, Route, Redirect } from 'react-router-dom';

import './style.scss'
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Submit from './components/Submit.jsx';
import EntryList from './components/EntryList.jsx';
import CommentList from './components/CommentList.jsx';
import Nav from './components/NavBar.jsx';
import UserProfile from './components/UserProfile.jsx'

const Wrapper = styles.div`
  margin: .7% 8%;
`;

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      entries: [],
      auth: false
    }
  }

  componentDidMount() {
    this.getEntries();
    this.authorize();
  }

  getEntries(){
    return axios.get('/entries')
    .then(data => {
      this.setState({entries: data.data})
    });
  }

  getEntry(entryid){
    return axios.get(`/entry?id=${entryid}`);
  }

  getComments(entryid){
    return axios.get('/comments', {
      params: {
        entryid: entryid
      }
    });
  }

  getUserEntries(user) {
    return axios.get(`/userEntries?id=${user}`);
  }

  getUserComments(user) {
    return axios.get(`/userComments?id=${user}`);
  }

  postEntry(title, url, text){
    if(url === ''){
      return axios.post('/entries', {
        title: title,
        url: 'none',
        text: text
      });
    }
    if(this.isURL(url)){
      if(url.slice(0, 4) !== 'http'){
        url = '//' + url;
      }
      return axios.post('/entries', {
        title: title,
        url: url,
        text: text
      });
    }
  }

  postComment(text, entryid){
    return axios.post('/comments', {
      text: text,
      entryid: entryid
    });
  }

  deleteEntry(entryid){
    return axios.delete(`/entry?id=${entryid}`);
  }

  deleteComment(commentid){
    console.log(commentid);
    return axios.delete(`/comment?id=${commentid}`);
  }
  
  isURL(str){
    let regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)){
      return true;
    }else{
      return false;
    }
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

  // Invoked in Login by onSubmitLogin function
  authenticate(url) {
    return axios.post(url, { username: this.state.username, password: this.state.password });
  }
  // Invoked in Login, Submit, UserProfile, and Home by onComponentDidMount lifecycle hook
  authorize() {
    axios.get('/submit').then((res) => {
      this.isAuthorized(res.data);
    });
  }
  // Invoked by authorize
  isAuthorized(res) {
    this.setState({
      auth: res.user
    });
  }

  render() {
  	return (
      <Wrapper> 
        <Nav 
          user={this.state.auth}
          authenticate={this.authenticate.bind(this)}
          authorize={this.authorize.bind(this)}
        />
        <Switch className="myList">
          <Route exact path="/" render={(props) => (
            <Home {...props}
              user={this.state.auth}
              data = {this.state.entries}
              authenticate={this.authenticate.bind(this)}
              authorize={this.authorize.bind(this)}
              deleteEntry={this.deleteEntry.bind(this)}
              getEntries={this.getEntries.bind(this)}
            />
          )}/>
          <Route exact path="/login" render={(props) => (
            <Login {...props}
              authorize={this.authorize.bind(this)} 
              authenticate={this.authenticate.bind(this)}
              usernameChange={this.usernameChange.bind(this)}
              passwordChange={this.passwordChange.bind(this)}
            />
          )}/> 
          <Route exact path="/submit" render={(props) => (
            this.state.auth !== undefined
            ? <Submit {...props} 
              getEntries={this.getEntries.bind(this)}
              postEntry={this.postEntry.bind(this)}
              authorize={this.authorize.bind(this)}
            />
            : <Redirect to='/login' />
          )}/> 
          <Route exact path="/thread/:id" render={(props) => (
            <CommentList {...props}
              user = {this.state.auth}
              getComments={this.getComments.bind(this)}
              postComment={this.postComment.bind(this)}
              deleteComment={this.deleteComment.bind(this)}
              getEntry={this.getEntry.bind(this)}
            />
          )}/> 
          <Route exact path="/user/:name" render={(props) => (
            <UserProfile {...props}
              user={this.state.auth}
              deleteEntry={this.deleteEntry.bind(this)}
              deleteComment={this.deleteComment.bind(this)}
              getUserComments={this.getUserComments.bind(this)}
              getUserEntries={this.getUserEntries.bind(this)}
              authorize={this.authorize.bind(this)}
              getEntry={this.getEntry.bind(this)}
            />
          )}/> 
        </Switch>
      </Wrapper> 
  	)
  }
}

ReactDOM.render((
  <HashRouter>
    <App />
  </HashRouter>
), document.getElementById('app'))
