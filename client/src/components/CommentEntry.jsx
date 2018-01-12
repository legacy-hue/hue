import React from 'react';
import axios from 'axios';
import { Feed, Icon } from 'semantic-ui-react'

class CommentEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upVotes: 0,
      downVotes: 0,
      total: 0
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

  upVote() {
    axios.post(`/upVoteComment?id=${this.props.comment.id}`)
    .then((curUpVotes) => {
      console.log(curUpVotes);
      // this.setState({
      //   upVotes: curUpVotes
      // })
    })
  }

  downVote() {
    //axios.post(`/downVote?id=${this.props.data.id}&&vote=${vote}`)
    axios.post(`/downVoteComment?id=${this.props.comment.id}`)
    .then((curDownVotes) => {
      console.log(curDownVotes);
      // this.setState({
      //   downVotes: curDownVotes
      // })
    })
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

              <Feed.Meta>
                <Feed.Like>
                  <Icon name='thumbs up' onClick={this.upVote.bind(this)}/>
                </Feed.Like>
                {this.state.upVotes} up votes
                <Feed.Like>
                  <Icon name='thumbs down' onClick={this.downVote.bind(this)}/>
                </Feed.Like>
              </Feed.Meta>

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
