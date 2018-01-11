import React from 'react';
import { Link } from 'react-router-dom';
import { Feed, Icon, Divider } from 'semantic-ui-react'

import CommentEntry from './CommentEntry.jsx';
import Entry from './Entry.jsx';

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
   // console.log(this.props.match.params.name)
    this.props.getUserEntries(this.props.match.params.name)
    .then(data => {
        if(data.data.length === 0){
          this.setState({redirect:  true});
        }
        return data;
      }
    )
    .then(data => this.setState({entries: data.data}));
    //.then(data => console.log('set state as: ', data.data));
    // this.props.getUserComments(this.props.match.params.name)
    // .then(data => this.setState({comments: data.data}));
  }

  componentWillReceiveProps(nextprops){
    this.props.getUserEntries(nextprops.params.name)
    .then(data => {
        if(data.data.length === 0){
          this.setState({redirect:  true});
        }
        return data;
      }
    )
    .then(data => this.setState({entry: data.data}));

    // this.props.getUserComments(nextprops.params.name)
    // .then(data => this.setState({comments: data.data}));
  }


  handleClick() {
    // this.props.deleteEntry(this.props.data.id)
    // .then(() => console.log('handleClick ran'));
  }

  render (props) {
    return (
      <div>
        User Page
        <div>
          {this.state.entries.map((entry, index) => 
            <Entry 
              key={index} 
              data={entry} 
              user={this.props.user} 
              deleteEntry={this.props.deleteEntry}
            />)}
        </div>
        <div>
        
        </div>
      </div>
    )
  }
}

export default UserProfile;
