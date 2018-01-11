import React from 'react';
import { Link } from 'react-router-dom';
import { Feed, Icon, Divider } from 'semantic-ui-react'

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.deleteEntry(this.props.data.id)
    .then(() => console.log('deleted entry'));
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
                  <Icon name='thumbs up' />
                </Feed.Like>
                <Feed.Like>
                  <Icon name='thumbs down' />
                </Feed.Like>
                13 Points
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
              13 Points
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
