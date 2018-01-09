import React from 'react';


class CommentEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <div className="ui message">
        <span className="header">{this.props.comment.name}: {this.props.comment.text}</span>
      </div>
    );
  }
}

export default CommentEntry;
