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
        <Menu widths='four'>
          <Link to="/login">
            <Button>Login/Signup</Button>
          </Link>

          <Link to="/login">
            <Button onClick={() => this.props.authenticate('\logout')}>Logout</Button>
          </Link>

          <Link to="/submit">
            <Button>Submit</Button>
          </Link>

          <Menu.Item name='username'>
            <i class="user icon"></i>
            {this.props.user}
          </Menu.Item>

        </Menu>
        
        <h1 className="ui header item">Welcome to hue</h1>
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