import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Form, Label, Button, Header, Menu } from 'semantic-ui-react'
import EntryList from './EntryList.jsx';



class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.authorize();
    this.props.getEntries();
  }

  render (props) {
    return (  
      <EntryList 
        data = {this.props.data}
        user = {this.props.user}
        deleteEntry = {this.props.deleteEntry}
        getEntries = {this.props.getEntries}
      />
    );
  }
}

export default Home;
