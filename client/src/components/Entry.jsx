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
      total: 0
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
    .then((curUpVotes) => {
      this.setState({
        points: curUpVotes
      })
    })
  }

  downVote() {
    //axios.post(`/downVote?id=${this.props.data.id}&&vote=${vote}`)
    axios.post(`/downVote?id=${this.props.data.id}`)
    .then((curDownVotes) => {
      this.setState({
        downVotes: curDownVotes
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
                {this.state.total} Prestige
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
