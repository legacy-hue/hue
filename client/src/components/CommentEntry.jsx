import React from 'react';


class CommentEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <div>
        <span>{this.props.comment.userid}: {this.props.comment.text}</span>
      </div>
    );
  }
}

export default CommentEntry;
