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
  	this.props.getComments(this.props.entry)
  	.then(data => this.setState({comments: data.data}))
  	.then(() => console.log(this.state.comments));
  }

  render () {
    return (
    	<div>
    	  {this.state.comments.map((comment, index) => <CommentEntry key = {index} comment={comment}/>)}
    	</div>
    );
  }
}

export default CommentList;
