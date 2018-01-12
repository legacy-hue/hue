import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Feed, Icon, Divider } from 'semantic-ui-react'

class Entry extends React.Component {
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
    this.props.deleteEntry(this.props.data.id)
    .then(() => {
      console.log('deleted entry');
      this.props.getEntries();
    });
  }

  upVote() {
    //console.log(`user: ${this.props.user} entry: ${this.props.data.id}`)
    axios.post(`/upVoteEntry?user=${this.props.user}&&entry=${this.props.data.id}`)
    .then(() => {
      this.getEntryVotes();
    })
  }

  downVote() {
    //console.log(`user: ${this.props.user} entry: ${this.props.data.id}`)
    axios.post(`/downVoteEntry?user=${this.props.user}&&entry=${this.props.data.id}`)
    .then(() => {
      this.getEntryVotes();
    })
  }

  getEntryVotes() {
    //console.log('getEntryVotes started')
    axios.get(`/getEntryVotes?id=${this.props.data.id}`)
    .then((obj) => {
      //console.log('getEntryVotes finished ', obj.data)
      const prest = obj.data[0].up_votes + obj.data[0].down_votes
      this.setState({
        thumbsUp: obj.data[0].up_votes,
        thumbsDown: obj.data[0].down_votes,
        prestige: prest
      })
    })
  }

  componentDidMount() {
    this.getEntryVotes();
  }

  render () {
    if(this.props.user === this.props.data.name){
      return (
        <div>
        <Feed>
          <Feed.Event>
            <Feed.Content>
              <Feed.Date>3 days ago</Feed.Date>
              <Feed.Summary>
                <a href={this.props.data.url}>{this.props.data.title}</a>
              </Feed.Summary>
              <Feed.Extra text>
                by <Link to={`/user/${this.props.data.name}`}>{this.props.data.name}</Link>
              </Feed.Extra>
              <Feed.Meta>
                <Feed.Like>
                  <Icon name='thumbs up' onClick={this.upVote.bind(this)}/>
                </Feed.Like>
                {this.state.thumbsUp}
                <Feed.Like>
                  <Icon name='thumbs down' onClick={this.downVote.bind(this)}/>
                </Feed.Like>
                {this.state.thumbsDown}
                <Link to={`/thread/${this.props.data.id}`}>comments</Link>
                <a onClick={this.handleClick}>remove</a>
              </Feed.Meta>
            </Feed.Content>
          </Feed.Event>
        </Feed>
        <Divider></Divider>
        </div>
      );
    }
    return (
      <div>
      <Feed>
        <Feed.Event>
          <Feed.Content>
            <Feed.Date>3 days ago</Feed.Date>
            <Feed.Summary>
              <a href={this.props.data.url}>{this.props.data.title}</a>
            </Feed.Summary>
            <Feed.Extra text>
              by <Link to={`/user/${this.props.data.name}`}>{this.props.data.name}</Link>
            </Feed.Extra>
            <Feed.Meta>
             {this.state.prestige} prestige 
              <Link to={`/thread/${this.props.data.id}`}>  comments</Link>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
      </Feed>
      <Divider></Divider>
      </div>
    );
  }
}

export default Entry;
