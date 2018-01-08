import React from 'react';
import { Link } from 'react-router-dom';
import EntryList from './EntryList.jsx';


var Home = (props) => (
	<div>
	  <Link to="/login">login</Link>
	  <br/>
	  <Link to="/login" onClick={() => props.authenticate('\logout')}>logout</Link>
	  <br/>
    <Link to="/submit" >submit</Link>
    <h4>Welcome to hue</h4>
    <EntryList data = {props.data} setEntry = {props.setEntry}/>
  </div>
)

export default Home;
//onClick={() => props.authorize('\submit')}