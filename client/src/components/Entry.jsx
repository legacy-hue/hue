import React from 'react';
import { Link } from 'react-router-dom';

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.setEntry(this.props.data.id);
  }

  render () {
    return (
      <div className="entry">
        <div>
          <a className = "link" href={this.props.data.url}>{this.props.data.title}</a>
        </div>
        <div>
          <Link to="/thread" onClick={this.handleClick}>comments</Link>
        </div>
      </div>
    );
  }
}

export default Entry;
