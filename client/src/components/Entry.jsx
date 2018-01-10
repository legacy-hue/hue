import React from 'react';
import { Link } from 'react-router-dom';

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <div className="entry ui message">
        <div>
          <a className="link header" href={this.props.data.url}>{this.props.data.title}</a>
          <span> by {this.props.data.name}</span>
        </div>
        <div>
          <Link to={`/thread/${this.props.data.id}`}>comments</Link>
        </div>
      </div>
    );
  }
}

export default Entry;
