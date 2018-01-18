import React, {PropTypes} from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Divider, Form, Label, Button, Header, Menu, Input, Icon } from 'semantic-ui-react'
import EntryList from './EntryList.jsx';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress (event) {
    if(event.key === 'Enter'){
      this.props.searchQuery(this.state.value);
      this.props.history.push('/search');
      this.setState({
        value: ''
      })
    }
  }

  // Renders different versions of the component depending if a user is logged in
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
            

            <Menu.Item position='right' name='search' className="navSearch">
              <Input to='/search/' 
                className="text" placeholder='Search...' 
                value={this.state.value}
                onChange={(e, {value}) => {
                  this.setState({value})}
                } 
                onKeyPress={this.handleKeyPress}/>
            </Menu.Item>

            <Menu.Item position='right' name='mail' className="nav">
              <Link to='/inbox' className="text">
                <Icon name='mail' /> 
              </Link>  
            </Menu.Item>
            
            <Menu.Item position='right' name='username' className="nav">
              <Link to={`/user/${this.props.user}`} className="text">
                <i className="user icon"></i>
                {this.props.user} 
              </Link>  
            </Menu.Item>


            <Menu.Item name='logout' position='right' className="nav">
              <Link to="/login" className="text" onClick={() => this.props.authenticate('\logout')}>
                Logout
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

            <Menu.Item position='right' name='search' className="navSearch">
              <Input to={`/search`} 
                className="text" placeholder='Search...' 
                value={this.state.value}
                onChange={(e, {value}) => {
                  this.setState({value})}
                } 
                onKeyPress={this.handleKeyPress}/>
            </Menu.Item>

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

export default withRouter(Nav);
