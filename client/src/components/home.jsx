import React from 'react';
import { Link } from 'react-router-dom';

var Home = () => (
	<div>
	  <Link to="/login">login</Link>
	  <br/>
	  <Link to="/logout">logout</Link>
    <h4>Welcome to hue</h4>
  </div>
)

export default Home;