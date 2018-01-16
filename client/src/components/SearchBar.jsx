import React, {Component} from 'react';
import {Search} from 'semantic-ui-react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className="searchBar">
        <i className="plus icon" />
        <Search placeholder="subhues..." />
      </div>
    );
  }
}

export default SearchBar;
