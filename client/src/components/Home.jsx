import React from 'react';
import { Link } from 'react-router-dom';
import styles from 'styled-components';
import { Divider, Form, Label, Button, Header, Menu } from 'semantic-ui-react'
import EntryList from './EntryList.jsx';

const Wrapper = styles.div`
  margin: .7% 8%;
`;

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.authorize()
  }

  render (props) {
    return (
      <Wrapper>
        <div className="ui three item menu" style={{background: '#ff6600'}}>
          <Link to="/login">
            <Button>Login/Signup</Button>
          </Link>

          <Link to="/login">
            <Button onClick={() => this.props.authenticate('\logout')}>Logout</Button>
          </Link>

          <Link to="/submit">
            <Button>Submit</Button>
          </Link>
        </div>
        
        <h1 className="ui header item">Welcome to hue</h1>
        <Divider></Divider>
        <EntryList data = {this.props.data}/>
      </Wrapper>      
    );
  }
}

export default Home;
