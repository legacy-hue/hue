import React from 'react';
import { Feed } from 'semantic-ui-react'

class CommentData extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	entry: {}
    };
  }

  componentDidMount() {
  	this.props.getEntry(this.props.comment.entryid)
  	.then((data) => {
  		this.setState({ entry: data.data[0] })
  	})
  }

  render() {
  	return (
  		<a href={this.state.entry.url}>
  			{this.state.entry.title}
  		</a>
  	);
  }
}

export default CommentData;
