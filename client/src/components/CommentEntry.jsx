import React from 'react';
import { Feed } from 'semantic-ui-react'

class CommentEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <Feed.Event>
        <Feed.Summary>{this.props.comment.name}</Feed.Summary>
        <Feed.Extra text>{this.props.comment.text}</Feed.Extra>
      </Feed.Event>
    );
  }
}

export default CommentEntry;
