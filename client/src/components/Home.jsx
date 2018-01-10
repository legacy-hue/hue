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
    if (this.props.user !== undefined) {
      return (

        <Wrapper>
          <Menu className="myMenu">

           <Menu.Item name='home' className="nav">
              <Link to="/">
                <h1 className="text">hue</h1>
              </Link>
            </Menu.Item>

            <Menu.Item name='submit' className="nav">
              <Link to="/submit" className="text">
                Submit
              </Link>
            </Menu.Item>

            <Menu.Item name='logout' position='right' className="nav">
              <Link to="/login" className="text" onClick={() => this.props.authenticate('\logout')}>
                Logout
              </Link>
            </Menu.Item>

            <Menu.Item position='right' name='username' className="nav">
              <i className="user icon"></i>
              {this.props.user} 
            </Menu.Item>

          </Menu>
        
          <EntryList 
          data = {this.props.data}
          user = {this.props.user}
          deleteEntry = {this.props.deleteEntry}
          />
        </Wrapper>);

    } else {
      return (

        <Wrapper>
          <Menu className="myMenu">

           <Menu.Item name='home' className="nav">
              <Link to="/">
                <h1 className="text">hue</h1>
              </Link>
            </Menu.Item>

            <Menu.Item name='submit' className="nav">
              <Link to="/submit" className="text">
                Submit
              </Link>
            </Menu.Item>

            <Menu.Item name='login' floated='right' className="nav">
              <Link to="/login" className="text">
                Login
              </Link>
            </Menu.Item>

            <Menu.Item position='right' name='username' className="nav">
              <i className="user icon"></i>
              {this.props.user} 
            </Menu.Item>

          </Menu>
        
          <EntryList 
          data = {this.props.data}
          user = {this.props.user}
          deleteEntry = {this.props.deleteEntry}
          />
        </Wrapper>    
      );
    }
  }
}

export default Home;


