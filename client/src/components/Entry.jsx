import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Feed, Icon, Divider } from 'semantic-ui-react'

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upVotes: 0,
      downVotes: 0,
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
    axios.post(`/upVote?id=${this.props.data.id}`)
    .then(() => {
      axios.get(`/upVote?id=${this.props.data.id}`)
      .then((upVotes) => {
        console.log(upVotes)
        this.setState({
          upVotes: upVotes.data[0].up_votes,
          prestige: this.state.prestige += 1
        })        
      })
    })
  }

  downVote() {
    axios.post(`/downVote?id=${this.props.data.id}`)
    .then(() => {
      axios.get(`/downVote?id=${this.props.data.id}`)
      .then((downVotes) => {
        this.setState({
          downVotes: downVotes.data[0].down_votes,
          prestige: this.state.prestige -= 1
        })
      })
    })
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
                <Feed.Like>
                  <Icon name='thumbs down' onClick={this.downVote.bind(this)}/>
                </Feed.Like>
                {this.state.upVotes} up votes
                {this.state.downVotes} down votes
                {this.state.prestige} prestige
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
              <Feed.Like>
                <Icon name='thumbs up' />
              </Feed.Like>
              <Feed.Like>
                <Icon name='thumbs down' />
              </Feed.Like>
              {this.state.points} Points
              <Link to={`/thread/${this.props.data.id}`}>comments</Link>
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
