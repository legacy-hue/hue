import React from 'react';
import { Feed } from 'semantic-ui-react'

class CommentEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.deleteComment(this.props.comment.id)
    .then(() => console.log('deleted comment'));
  }


  render () {
    if(this.props.user === this.props.comment.name){
      return (
        <Feed>
          <Feed.Event>
            <Feed.Content>
              <Feed.Summary>
                {this.props.comment.name}: 
              </Feed.Summary>
              <Feed.Meta>
                {this.props.comment.text}
              </Feed.Meta>
              <button onClick={this.handleClick}>
                delete
              </button>
            </Feed.Content>
          </Feed.Event>
        </Feed>
      );
    }
    return (
      <Feed>
        <Feed.Event>
          <Feed.Content>
            <Feed.Summary>
              {this.props.comment.name}: 
            </Feed.Summary>
            <Feed.Meta>
              {this.props.comment.text}
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    );
  }
}

export default CommentEntry;
