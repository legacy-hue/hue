import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Form, Label, Button, Header, Menu } from 'semantic-ui-react'
import EntryList from './EntryList.jsx';



class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.authorize()
  }

  render (props) {
    if (this.props.data.length === 0) {
      return (
          <h1>Sorry, no results found!</h1>
        )
    }

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

export default SearchResults;
