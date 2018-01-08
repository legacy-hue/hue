import React from 'react';
import CommentEntry from './CommentEntry.jsx';


class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	comments: []
    };
  }

  componentDidMount() {
  	this.props.getComments(this.props.entry.id)
  	.then(data => this.setState({comments: data.data}))
  	.then(() => console.log(this.state.comments));
  }

  render () {
    return (
    	
    	<div>
	    	<div className="entry" class="ui message">
	    	  <div>
	    	    <a className = "link" href={this.props.entry.url} class="header">{this.props.entry.title}</a>
	    	  </div>
	    	</div>
    	  {this.state.comments.map((comment, index) => <CommentEntry key = {index} comment={comment}/>)}
    	</div>
    );
  }
}

export default CommentList;
