import React from 'react';


class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <div className="entry">
        <a className = "link" href={this.props.data.url}>{this.props.data.title}</a>
      </div>
    );
  }
}

export default Entry;
