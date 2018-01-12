import React from 'react';
import axios from 'axios';
import { Feed, Icon } from 'semantic-ui-react'

class CommentEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbsUp: 0,
      thumbsDown: 0,
      prestige: 0
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
    axios.post(`/upVoteComment?user=${this.props.user}&&comment=${this.props.comment.id}&&entry=${this.props.entry.id}`)
    .then(() => {
      this.getCommentVotes();
    })
  }

  downVote() {
    axios.post(`/downVoteComment?user=${this.props.user}&&comment=${this.props.comment.id}&&entry=${this.props.entry.id}`)
    .then(() => {
      this.getCommentVotes();
    })
  }

  getCommentVotes() {
    axios.get(`/getCommentVotes?id=${this.props.comment.id}`)
    .then((obj) => {
      const prest = obj.data[0].up_votes + obj.data[0].down_votes
      this.setState({
        thumbsUp: obj.data[0].up_votes,
        thumbsDown: obj.data[0].down_votes,
        prestige: prest
      })
    })
  }

  componentWillReceiveProps() {
    this.getCommentVotes();    
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
                {this.state.thumbsUp}
                <Feed.Like>
                  <Icon name='thumbs down' onClick={this.downVote.bind(this)}/>
                </Feed.Like>
                {this.state.thumbsDown}
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
                <Feed.Like>
                  <Icon name='thumbs up' onClick={this.upVote.bind(this)}/>
                </Feed.Like>
                {this.state.thumbsUp}
                <Feed.Like>
                  <Icon name='thumbs down' onClick={this.downVote.bind(this)}/>
                </Feed.Like>
                {this.state.thumbsDown}
              </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
      </Feed>
    );
  }
}

export default CommentEntry;
