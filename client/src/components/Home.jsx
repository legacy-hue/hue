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

        <div class="ui three item menu" style={{background: '#ff6600'}}>
          <Link to="/login"><Button class="item" style={{color: 'black'}}>Login/Signup</Button></Link>
          <Link to="/login"><Button class="item" style={{color: 'black'}} onClick={() => this.props.authenticate('\logout')}>Logout</Button></Link>
          <Link to="/submit"><Button class="item" style={{color: 'black'}}>Submit</Button></Link>
        </div>

        <h1 class="ui header item">Welcome to hue</h1>
        <Divider></Divider>

        <EntryList data = {this.props.data} setEntry = {this.props.setEntry}/>

      </Wrapper>      
    );
  }
}



export default Home;

// make home a class
// on component did mount run authorize
// authorize will query the server 
// the server will return true/false
// authorize sets true/false as the auth status
// when user clicks submit route checks auth status

// var Home = (props) => (
//   <Wrapper>

//     <div class="ui three item menu" style={{background: '#ff6600'}}>
//       <Link to="/login"><Button class="item" style={{color: 'black'}}>Login/Signup</Button></Link>
//       <Link to="/login"><Button class="item" style={{color: 'black'}} onClick={() => props.authenticate('\logout')}>Logout</Button></Link>
//       <Link to="/submit"><Button class="item" style={{color: 'black'}}>Submit</Button></Link>
//     </div>

//     <h1 class="ui header item">Welcome to hue</h1>
//     <Divider></Divider>

//     <EntryList data = {props.data} setEntry = {props.setEntry}/>

//   </Wrapper>
// )
