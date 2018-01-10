import React from 'react';
import { Link } from 'react-router-dom';
import { Feed, Icon, Divider } from 'semantic-ui-react'

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render () {
    return (
      <div>
      <Feed>
        <Feed.Event>
          <Feed.Label image='http://www.catster.com/wp-content/uploads/2017/08/A-fluffy-cat-looking-funny-surprised-or-concerned.jpg' />
          <Feed.Content>
            <Feed.Date>3 days ago</Feed.Date>
            <Feed.Summary>
              <a>{this.props.data.name}</a> created a post
            </Feed.Summary>
            <Feed.Extra text>
              <a href={this.props.data.url}>{this.props.data.title}</a>
            </Feed.Extra>
            <Feed.Meta>
              <Feed.Like>
                <Icon name='thumbs up' />
              </Feed.Like>
              <Link to={`/thread/${this.props.data.id}`}>comments</Link>
              <Feed.Like>
                <Icon name='thumbs down' />
              </Feed.Like>
              13 Points
              <Link to={`/thread/${this.props.data.id}`}>Remove</Link>
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



// <<<<<<< HEAD
//       <div className="entry ui message">
//         <div>
//           <a className="link header" href={this.props.data.url}>{this.props.data.title}</a>
//           <span> by {this.props.data.name}</span>
//         </div>
//         <div>
//           <Link to={`/thread/${this.props.data.id}`}>comments</Link>
//         </div>
// =======
