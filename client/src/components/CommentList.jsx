import React from 'react';
import CommentEntry from './CommentEntry.jsx';


class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	comments: [],
    	comment: ''
    };
    this.textChange = this.textChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
  	this.props.getComments(this.props.entry.id)
  	.then(data => this.setState({comments: data.data}))
  	.then(() => console.log(this.state.comments));
  }

  handleClick() {
  	this.props.postComment(this.state.comment, this.props.entry.id)
  	.then(() => {
  		this.props.getComments(this.props.entry.id)
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
    	<div>
	    	<div className="entry ui message">
	    	  <div>
	    	    <a className = "link header" href={this.props.entry.url}>{this.props.entry.title}</a>
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
    	</div>
    );
  }
}

export default CommentList;
