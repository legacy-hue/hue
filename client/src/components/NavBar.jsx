import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Form, Label, Button, Header, Menu } from 'semantic-ui-react'
import EntryList from './EntryList.jsx';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render (props) {
    if (this.props.user !== undefined) { // This renders if a user is logged in
      return (
        <Menu className="myMenu">

         <Menu.Item name='home' className="nav">
            <Link to="/">
              <h1 className="text">hue</h1>
            </Link>
          </Menu.Item>

          <Menu.Item name='submit' className="nav">
            <Link to="/submit" className="text">
              New Post
            </Link>
          </Menu.Item>

            <Menu.Menu position="right">
            <Menu.Item name='logout' position='right' className="nav">
              <Link to="/login" className="text" onClick={() => this.props.authenticate('\logout')}>
                Logout
              </Link>
            </Menu.Item>
            <Menu.Item position='right' name='username' className="nav">
              <Link to={`/user/${this.props.user}`} className="text">
                <i className="user icon"></i>
                {this.props.user} 
              </Link>  
            </Menu.Item>
          </Menu.Menu>

        </Menu>
      )
    } else { // This renders if a user is not logged in
      return (
        <Menu className="myMenu">

         <Menu.Item name='home' className="nav">
            <Link to="/">
              <h1 className="text">hue</h1>
            </Link>
          </Menu.Item>

          <Menu.Item name='submit' className="nav">
            <Link to="/submit" className="text">
              New Post
            </Link>
          </Menu.Item>

            <Menu.Menu position="right">
            <Menu.Item name='login' className="nav">
              <Link to="/login" className="text">
                Login
              </Link>
            </Menu.Item>
            <Menu.Item name='username' className="nav">
              <i className="user icon"></i>
              {this.props.user} 
            </Menu.Item>
          </Menu.Menu>

        </Menu>
      );
    }
  }
}

export default Nav;
