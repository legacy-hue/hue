import React from 'react';
import { Feed, Comment, Header, Form, Button, Icon } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom';
import CommentEntry from './CommentEntry.jsx';
import ta from 'time-ago';

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
    .then(data => this.setState({entry: data.data[0]}));

  	this.props.getComments(this.props.match.params.id)
  	.then(data => this.setState({comments: data.data}));
  }

  componentWillReceiveProps(nextprops){
    this.props.getEntry(nextprops.match.params.id)
    .then(data => {
        if(data.data.length === 0){
          this.setState({redirect:  true});
        }
        return data;
      }
    )
    .then(data => this.setState({entry: data.data[0]}));

    this.props.getComments(nextprops.match.params.id)
    .then(data => this.setState({comments: data.data}));
  }

  handleClick() {
  	this.props.postComment(this.state.comment, this.props.match.params.id)
  	.then(() => {
  		this.props.getComments(this.props.match.params.id)
  		.then(data => this.setState({comments: data.data}))
  	});
  }

  afterDelete() {
    this.props.getComments(this.props.match.params.id)
    .then(data => this.setState({comments: data.data}));
  }

  textChange(input) {
    this.setState({
      comment: input.target.value
    });
  }

  render () {
    if(this.state.redirect){
      return <Redirect to='/'/>;
    }
    if(this.state.entry.text === ''){
      return (
      	<div>
  	    	<div className = 'ui segment'>
            <Feed>
              <Feed.Event>
                <Feed.Content>
                  <Feed.Date>{ta.ago(this.state.entry.created_at)}</Feed.Date>
                  <Feed.Summary>
                    <a href={this.state.entry.url}>{this.state.entry.title}</a>
                  </Feed.Summary>
                  <Feed.Extra text>
                    by <Link to={`/user/${this.state.entry.name}`}>{this.state.entry.name}</Link>
                  </Feed.Extra>
                  <Feed.Meta>
                    <Feed.Like>
                      <Icon name='thumbs up' />
                    </Feed.Like>
                    <Feed.Like>
                      <Icon name='thumbs down' />
                    </Feed.Like>
                    13 Points
                    <Link to={`/thread/${this.state.entry.id}`}>comments</Link>
                  </Feed.Meta>
                </Feed.Content>
              </Feed.Event>
            </Feed>
  	    	</div>
  	    	<div>
          <Form>
            <Form.TextArea placeholder='Comment here...' onChange={this.textChange}/>
            <Button content='Submit Comment' labelPosition='left' icon='edit' primary onClick={this.handleClick}/>
          </Form>
          </div>
      	  <Comment.Group>
            <Header as='h3' dividing>Comments</Header>
            {this.state.comments.map((comment, index) => <CommentEntry key = {index} comment={comment} user = {this.props.user} deleteComment = {this.props.deleteComment} afterDelete={this.afterDelete.bind(this)}/>)}
          </Comment.Group>
      	</div>
      );
    }
    return (
        <div>
          <div className = 'ui segment'>
            <Feed>
                <Feed.Event>
                  <Feed.Content>
                    <Feed.Date>{ta.ago(this.state.entry.created_at)}</Feed.Date>
                    <Feed.Summary>
                      <a href={this.state.entry.url}>{this.state.entry.title}</a>
                    </Feed.Summary>
                    <Feed.Extra text>
                      by <Link to={`/user/${this.state.entry.name}`}>{this.state.entry.name}</Link>
                    </Feed.Extra>
                    <Feed.Meta>
                      <Feed.Like>
                        <Icon name='thumbs up' />
                      </Feed.Like>
                      <Feed.Like>
                        <Icon name='thumbs down' />
                      </Feed.Like>
                      13 Points
                      <Link to={`/thread/${this.state.entry.id}`}>comments</Link>
                    </Feed.Meta>
                  </Feed.Content>
                </Feed.Event>
              </Feed>
          </div>
          <div>
          <Form>
            <Form.TextArea placeholder='Comment here...' onChange={this.textChange}/>
            <Button content='Submit Comment' labelPosition='left' icon='edit' primary onClick={this.handleClick}/>
          </Form>
          </div>
          <Comment.Group>
            <Header as='h3' dividing>Comments</Header>
            {this.state.comments.map((comment, index) => <CommentEntry key = {index} comment={comment} user = {this.props.user} deleteComment = {this.props.deleteComment} afterDelete={this.afterDelete.bind(this)}/>)}
          </Comment.Group>
        </div>
      );
  }
}

export default CommentList;
