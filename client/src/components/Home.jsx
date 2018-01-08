import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Form, Label, Button, Header, Menu } from 'semantic-ui-react'
import EntryList from './EntryList.jsx';


var Home = (props) => (
	<div>

    <div class="ui three item menu center aligned">
      <Link to="/login"><Button class="item">Login/Signup</Button></Link>
      <Link to="/login"><Button class="item" onClick={() => props.authenticate('\logout')}>Logout</Button></Link>
      <Link to="/submit"><Button class="item">Submit</Button></Link>
    </div>

    <h1 class="ui header">Welcome to hue</h1>
    <Divider></Divider>
    <EntryList data = {props.data} setEntry = {props.setEntry}/>
  </div>
)

export default Home;
