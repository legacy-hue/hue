import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Form, Label, Button, Header, Menu, Feed, Icon } from 'semantic-ui-react'



class Inbox extends React.Component {
  constructor(props) {
    super(props);
  }

  render (props) {
    return (
        <Menu className="myMenuInbox">
            <Menu.Item name='inbox' className='nav'>
              <Link to='/inbox' className='text'>
                Inbox
              </Link> 
            </Menu.Item>

            <Menu.Item name='compose' className="nav">
              <Link to="/compose" className="text">
                Compose
              </Link>
            </Menu.Item>

              <Menu.Menu position="right">
              

              <Menu.Item position='right' name='sent' className="nav">
                <Link to="/sent" className="text">
                  Sent
                </Link>
              </Menu.Item>

              <Menu.Item position='right' name='trash' className="nav">
                <Link to='/trash' className="text">
                  <Icon name='trash outline' />
                  
                </Link>  
              </Menu.Item>

            </Menu.Menu>

          </Menu>
      )
  }
}

export default Inbox;
