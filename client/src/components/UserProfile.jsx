import React from 'react';
import { Link } from 'react-router-dom';
import { Feed, Icon, Divider, Comment, Tab, Form, Label, Button, Input } from 'semantic-ui-react'

import Entry from './Entry.jsx';
import CommentEntry from './CommentEntry.jsx';
import CommentData from './CommentData.jsx';

import axios from 'axios';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      comments: [],
      liked: [],
      redirect: false,
      title: '',
      text: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.textChange = this.textChange.bind(this);
    this.handleDeleteForm = this.handleDeleteForm.bind(this);
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
    .then(data => this.setState({entries: data.data.reverse()}));
    
    this.props.getUserComments(this.props.match.params.name)
    .then(data => this.setState({comments: data.data.reverse()}));

    this.getLikedPosts(this.props.match.params.name)
    .then(data => this.setState({liked: data.data.reverse()}));
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
    .then(data => this.setState({comments: data.data.reverse()}));
  }

  getLikedPosts(username) {
    return axios.get(`/likedPosts?id=${username}`);
  }

  handleDeleteForm(e) {
    e.preventDefault();
    this.props.deleteAccount(this.props.user);
    this.props.authenticate('/logout')
    this.props.history.push('/login');
  }

  handleClick() {
    // const {history} = this.props;
    // this.props.postEntry(this.state.title, this.state.url, this.state.text, this.props.currentSub)
    // .then((res) => {
    //   if(res.data === 'success'){
    //     this.props.getEntries()
    //       .then(() => history.push('/'));
    //   }
    // });
    this.props.sendMessage({
      recipient: this.props.match.params.name,
      sender: this.props.user,
      text: this.state.text,
      title: this.state.title
    })
    this.setState({
      title: '',
      text: ''
    })
  }

  titleChange(input) {
    this.setState({
      title: input.target.value
    });
  }

  textChange(input) {
    this.setState({
      text: input.target.value
    });
  }

  render (props) {
    const panes = [
      {menuItem: 'Entries', render: () => {
        return (
          <div>
            <div>
              <br />
              {this.state.entries.map((entry, index) => 
                <Entry 
                  key={index} 
                  data={entry} 
                  user={this.props.user} 
                  deleteEntry={this.props.deleteEntry}
                />)}
            </div>
          </div>
        )
      }},
      {menuItem: 'Comments', render: () => {
        return(
          <div>
            <div>
            <Comment.Group>
              <br />
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
                  entry={comment.entryid}
                /> 
                <Divider></Divider>
                </div>
                )}
              )}
            </Comment.Group>
            </div>
          </div>
        )
      }},
      {
        menuItem: 'Liked Posts', render: () => {
          return (
            <div>
              <div>
                <Comment.Group>
                  <br />
                  {this.state.liked.map((comment, index) => {
                    if(comment.type === 'comment') {
                      return (<div key={index}>
                        <CommentData
                          comment={comment}
                          getEntry={this.props.getEntry}
                        />
                        <CommentEntry
                          onLikedTab={true}
                          comment={comment}
                          user={this.props.user}
                          deleteComment={this.props.deleteComment}
                          entry={comment.entryid}
                        />
                        <Divider></Divider>
                      </div>
                      )
                    } else {
                      return (
                        <Entry
                          onLikedTab={true}
                          key={index}
                          data={comment}
                          user={this.props.user}
                          deleteEntry={this.props.deleteEntry}
                        />
                      )
                    }
                  }
                  )}
                </Comment.Group>
              </div>
            </div>
          )
        }
      },
      {menuItem: 'Send a message!', render: () => {
        return (
          <div>
              {this.props.user !== undefined
              ? <div>
                  {this.props.user === this.props.match.params.name 
                    ? <h1 className='topGap'>This is you!</h1>
                    :
                      <div className='topGap'>
                        <h4>Compose</h4>
                        <Form>
                          <Form.Field>
                            <label>Subject</label>
                            <input placeholder='Subject' value={this.state.title} onChange={this.titleChange}/>
                          </Form.Field>
                          
                          <Form.TextArea label='Text' value={this.state.text} placeholder='Type your message here...' onChange={this.textChange}/>
                          <Form.Field>
                            <Button onClick={this.handleClick}>Send!</Button>
                          </Form.Field>
                        </Form>
                      </div>
                  }
                </div>
              : <h1 className='topGap'>Please log in to send messages!</h1>
            } 
          </div>
          )
      }},
      {menuItem: 'DELETE', render: () => {
        return (
          <div>
            {this.props.user === this.props.match.params.name
            ? <div className='topGap'>
              Enter your password to permanently delete your account.
                <Form className='topGap' onSubmit={this.handleDeleteForm}>
                  <Input placeholder="password..."></Input>
                  <Button type='submit'>DELETE ACCOUNT</Button>
                </Form>
            </div>
            : <div className='topGap'>
              Login to delete your account.
            </div>
            }
          </div>
        )
      }}
    ]


    return (
      <div className = 'ui segment'>
      <h4>User Profile for {this.props.match.params.name}</h4>
      <Tab panes={panes} />
      </div>
    )
  }
}

export default UserProfile;
