import React from 'react';
import CommentEntry from './CommentEntry.jsx';

const CommentsList = (props) => (
  <div>
    {props.comments.map((comment, index) => <CommentEntry key = {index} comment={comment}/>)}
  </div>
);

export default CommentsList;
