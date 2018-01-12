import React from 'react';
import { Feed, Comment } from 'semantic-ui-react';
import ta from 'time-ago';

class CommentEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.deleteComment(this.props.comment.id)
    .then(() => {
      console.log('deleted comment');
      this.props.afterDelete();
    });
  }


  render () {
    if(this.props.user === this.props.comment.name){
      return (
        <Comment>
          <Comment.Content>
            <Comment.Author as='a'>{this.props.comment.name}</Comment.Author>
            <Comment.Metadata>
              <div>{ta.ago(this.props.comment.created_at)}</div>
            </Comment.Metadata>
            <Comment.Text>{this.props.comment.text}</Comment.Text>
            <Comment.Actions>
              <Comment.Action onClick={this.handleClick}>delete</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      );
    }
    return (
      <Comment>
        <Comment.Content>
          <Comment.Author as='a'>{this.props.comment.name}</Comment.Author>
          <Comment.Metadata>
            <div>{ta.ago(this.props.comment.created_at)}</div>
          </Comment.Metadata>
          <Comment.Text>{this.props.comment.text}</Comment.Text>
          <Comment.Actions></Comment.Actions>
        </Comment.Content>
      </Comment>
    );
  }
}

export default CommentEntry;
