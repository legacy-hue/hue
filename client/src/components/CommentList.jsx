import React from 'react';
import { Item, Feed, Comment, Header, Form, Button, Icon } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom';
import CommentEntry from './CommentEntry.jsx';
import ta from 'time-ago';
import axios from 'axios';

class CommentList extends React.Component {
  constructor(props, params) {
    super(props);
    this.state = {
      entry: {},
    	comments: [],
    	comment: '',
      redirect: false
    };
    this.textChange = this.textChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getComments = this.getComments.bind(this);
  }

  componentDidMount() {
    this.props.getEntry(this.props.match.params.id)
    .then(data => {
        if(data.data.length === 0){
          this.setState({redirect:  true});
        }
        return data;
      }
    )
    .then(data => this.setState({entry: data.data[0]}))
    .then(() => {
      this.getComments(this.state.entry.id)
      .then((comments) => {
        this.setState({comments: comments.data.reverse()})
      })
    })

  	// this.getComments(this.props.match.params.id)
  	// .then(data => this.setState({comments: data.data.reverse()}))
  }

  componentWillReceiveProps(nextprops) {
    this.props.getEntry(nextprops.match.params.id)
    .then(data => {
        if(data.data.length === 0){
          this.setState({redirect:  true});
        }
        return data;
      }
    )
    .then(data => this.setState({entry: data.data[0]}));

    // this.getComments(nextprops.match.params.id)
    // .then(data => this.setState({comments: data.data.reverse()}));
  }

  getComments(entryid){
    return axios.get('/comments', {
      params: {
        entryid: this.state.entry.id
      }
    })
  }

  handleClick() {
  	this.props.postComment(this.state.comment, this.props.match.params.id)
  	.then(() => {
      if (this.props.user === this.state.entry.name) {
        this.getComments(this.state.entry.id)
        .then((comments) => {
          this.setState({
            comment: '',
            comments: comments.data.reverse()
          })
        })
        // var copy = [...this.state.comments];
        // var date = Date.now();
        // copy.push({id: 1, text: this.state.comment, name: this.props.user, created_at: date})
        // this.setState({
        //   comment: '',
        //   comments: copy
        // })
      } else {
    		this.props.sendMessage({
          recipient: this.state.entry.name,
          sender: this.props.user,
          text: this.state.comment,
          title: `${this.props.user} has posted a comment in '${this.state.entry.title}'`
        })
        .then(() => {
          this.getComments(this.state.entry.id)
          .then((comments) => {
            this.setState({
              comment: '',
              comments: comments.data.reverse()
            })
          })
          // var copy = [...this.state.comments];
          // var date = Date.now();
          // copy.push({text: this.state.comment, name: this.props.user, created_at: date})
          // this.setState({
          //   comment: '',
          //   comments: copy
          // })
        })
      }
  	});
  }

  afterDelete() {
    this.getComments(this.props.match.params.id)
    .then(data => this.setState({comments: data.data}));
  }

  textChange(input) {
    this.setState({
      comment: input.target.value
    });
  }

  // Renders different versions of the componet depending if a user is logged in
  render () {
    if(this.state.redirect){
      return <Redirect to='/'/>;
    }
    if(this.state.entry.text === ''){
      return (
      	<div>
  	    	<div className = 'ui segment'>
            <Item>
              <Item.Content>
                <Item.Header><a href={this.state.entry.url}>{this.state.entry.title}</a></Item.Header>
              </Item.Content>
              <Item.Extra>
                <Icon name='thumbs up' />
                <Icon name='thumbs down'/>
                by <Link to={`/user/${this.state.entry.name}`}>{this.state.entry.name}</Link> {ta.ago(this.state.entry.created_at)} 
              </Item.Extra>
            </Item>
  	    	</div>
  	    	<div>
          <Form>
            <Form.TextArea placeholder='Comment here...' value={this.state.comment} onChange={this.textChange}/>
            <Button content='Submit Comment' labelPosition='left' icon='edit' primary onClick={this.handleClick}/>
          </Form>
          </div>
      	  <Comment.Group>
            <Header as='h3' dividing>Comments</Header>
            {this.state.comments.map((comment, index) => <CommentEntry key = {index} comment={comment} user = {this.props.user} deleteComment = {this.props.deleteComment} afterDelete={this.afterDelete.bind(this)} entry={this.state.entry.id}/>)}
          </Comment.Group>
      	</div>
      );
    }
    return (
      <div>
        <div>
          <div className = 'ui segment'>
            <Item>
              <Item.Content>
                <Item.Header><a href={this.state.entry.url}>{this.state.entry.title}</a></Item.Header>
              </Item.Content>
              <Item.Description>
                {this.state.entry.text}
              </Item.Description>
              <Item.Extra>
                <Icon name='thumbs up' />
                <Icon name='thumbs down'/>
                by <Link to={`/user/${this.state.entry.name}`}>{this.state.entry.name}</Link> {ta.ago(this.state.entry.created_at)} 
              </Item.Extra>
            </Item>
          </div>
          <div>
          <Form>
            <Form.TextArea placeholder='Comment here...' value={this.state.comment} onChange={this.textChange}/>
            <Button content='Submit Comment' labelPosition='left' icon='edit' primary onClick={this.handleClick}/>
          </Form>
          </div>
          <Comment.Group>
            <Header as='h3' dividing>Comments</Header>
            {this.state.comments.map((comment, index) => 
              <CommentEntry 
                key = {index} 
                comment={comment} 
                user = {this.props.user} 
                deleteComment = {this.props.deleteComment} 
                afterDelete={this.afterDelete.bind(this)} 
                entry={this.state.entry.id}
              />
            )}
          </Comment.Group>
        </div>
      </div>
    );
  }
}

export default CommentList;
