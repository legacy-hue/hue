import React from 'react';
import { Link } from 'react-router-dom';
import styles from 'styled-components';
import { Divider, Form, Label, Button, Header, Menu } from 'semantic-ui-react'
import EntryList from './EntryList.jsx';

const Wrapper = styles.div`
  margin: .7% 8%;
`;

var Home = (props) => (
	<Wrapper>

    <div class="ui three item menu" style={{background: '#ff6600'}}>
      <Link to="/login"><Button class="item" style={{color: 'black'}}>Login/Signup</Button></Link>
      <Link to="/login"><Button class="item" style={{color: 'black'}} onClick={() => props.authenticate('\logout')}>Logout</Button></Link>
      <Link to="/submit"><Button class="item" style={{color: 'black'}}>Submit</Button></Link>
    </div>

    <h1 class="ui header item">Welcome to hue</h1>
    <Divider></Divider>

    <EntryList data = {props.data} setEntry = {props.setEntry}/>

  </Wrapper>
)

export default Home;
