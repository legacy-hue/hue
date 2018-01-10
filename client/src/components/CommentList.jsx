import React from 'react';
import { Feed } from 'semantic-ui-react'
import CommentEntry from './CommentEntry.jsx';

class CommentList extends React.Component {
  constructor(props, params) {
    super(props);
    this.state = {
      entry: {},
    	comments: [],
    	comment: ''
    };
    this.textChange = this.textChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getEntry(this.props.match.params.id)
    .then(data => this.setState({entry: data.data[0]}));

  	this.props.getComments(this.props.match.params.id)
  	.then(data => this.setState({comments: data.data}));
  }

  componentWillReceiveProps(nextprops){
    this.props.getEntry(this.props.match.params.id)
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

  textChange(input) {
    this.setState({
      comment: input.target.value
    });
  }

  render () {
    return (
    	<Feed>
	    	<div>
	    	  <div>
<<<<<<< HEAD
	    	    <a className = "link header" href={this.state.entry.url}>{this.state.entry.title}</a>
            <span> by {this.state.entry.name}</span>
=======
	    	    <a href={this.props.entry.url}>{this.props.entry.title}</a>
            <span> by {this.props.entry.name}</span>
>>>>>>> Add styling to entry feed
	    	  </div>
	    	</div>
	    	<br/>
	    	<div>
	    	<h4>Submit Comment</h4>
				<input onChange={this.textChange}/>
				<br/>
				<button onClick={this.handleClick}>submit</button>
				</div>
	    	<br/>
    	  {this.state.comments.map((comment, index) => <CommentEntry key = {index} comment={comment}/>)}
    	</Feed>
    );
  }
}

export default CommentList;
