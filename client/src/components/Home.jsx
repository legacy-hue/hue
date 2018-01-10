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
        <Menu widths='five' className="myMenu">

         <Menu.Item name='home' className="nav">
            <Link to="/">
              <h1 className="text">hue</h1>
            </Link>
          </Menu.Item>

          <Menu.Item name='login/signup' className="nav">
            <Link to="/login" className="text">
              Login/Signup
            </Link>
          </Menu.Item>

          <Menu.Item name='logout' className="nav">
            <Link to="/login" className="text" onClick={() => this.props.authenticate('\logout')}>
              Logout
            </Link>
          </Menu.Item>

          <Menu.Item name='submit' className="nav">
            <Link to="/submit" className="text">
              Submit
            </Link>
          </Menu.Item>

          <Menu.Item name='username'>
            <i class="user icon"></i>
            {this.props.user}
          </Menu.Item>

        </Menu>
        
        <h1 className="ui header item">See what's trending</h1>
        <Divider></Divider>
        <EntryList data = {this.props.data}/>
      </Wrapper>      
    );
  }
}

export default Home;



        // <Menu widths='four'>

        //   <Menu.Item name='hue' header>
        //     <Link to="/">
        //     <Button>hue</Button>
        //     </Link>
        //   </Menu.Item>

        //   <Menu.Item name='submit'>
        //     <Link to="/submit">
        //       <Button>New Post</Button>
        //     </Link>
        //   </Menu.Item>

        //   <Menu.Item name='login/logout'>
        //     <Link to="/login">
        //       <Button onClick={() => this.props.authenticate('\logout')}>Login/Logout</Button>
        //     </Link>
        //   </Menu.Item>

        //   <Menu.Item name='username'>
        //     <i class="user icon"></i>
        //     {this.props.user}
        //   </Menu.Item>

        // </Menu>