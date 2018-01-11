import React from 'react';
import { Link } from 'react-router-dom';
import { Feed, Icon, Divider } from 'semantic-ui-react'

import Entry from './Entry.jsx';
import CommentEntry from './CommentEntry.jsx';
import CommentData from './CommentData.jsx';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      comments: [],
      redirect: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.authorize()
    this.props.getUserEntries(this.props.match.params.name)
    .then(data => {
        if(data.data.length === 0){
          this.setState({redirect:  true});
        }
        return data;
      }
    )
    .then(data => this.setState({entries: data.data}));
    
    this.props.getUserComments(this.props.match.params.name)
    .then(data => this.setState({comments: data.data}));
  }

  componentWillReceiveProps(nextprops){
    this.props.getUserEntries(nextprops.match.params.name)
    .then(data => {
        if(data.data.length === 0){
          this.setState({redirect:  true});
        }
        return data;
      }
    )
    .then(data => this.setState({entry: data.data}));

    this.props.getUserComments(nextprops.match.params.name)
    .then(data => this.setState({comments: data.data}));
  }

  handleClick() {
    // this.props.deleteEntry(this.props.data.id)
    // .then(() => console.log('handleClick ran'));
  }

  render (props) {
    return (
      <div>
        {this.props.match.params.name}'s posts:
        <div>
          {this.state.entries.map((entry, index) => 
            <Entry 
              key={index} 
              data={entry} 
              user={this.props.user} 
              deleteEntry={this.props.deleteEntry}
            />)}
        </div>
        {this.props.match.params.name}'s comments:

        <div>
          {this.state.comments.map((comment, index) => {
            return ( <div key={index}>
            <CommentData 
              comment = {comment}
              getEntry={this.props.getEntry}
            />

            <CommentEntry
              comment = {comment}
              user = {this.props.user}
              deleteComment = {this.props.deleteComment}
            /> 
            </div>)}
          )}
        </div>
      </div>
    )
  }
}

export default UserProfile;
