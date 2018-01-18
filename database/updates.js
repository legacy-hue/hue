//Work in progress, I swear
const knex = require('./index');


const updateEntryVote = (userid, entryid, voted, prevVote) => {
  return knex('entries_votes')
    .where({ userid, entryid })
    .update({ voted: voted })
    .returning('*')
    .then(data => {
      console.log('Prev:', prevVote, 'Voted:', voted, 'For:', data);      
      // if(prevVote === 'upvote' && voted === 'none') {
      //   return unUpvoteComment(data.commentid);
      // } else if (prevVote === 'downvote' && voted === 'none') {
      //   return unDownvoteComment(data.commentid);
      // } else {
      //   return swapCommentVote(data.commentid);
      // }
    })
}

const updateCommentVote = (userid, commentid, voted, prevVote) => {
  return knex('comments_votes')
    .where({ userid, commentid })
    .update({ voted: voted })
    .returning('*')
    .then(data => {
      data = data[0];
      console.log('Comment data:', data);
      console.log('Comment id:', data.commentid)

      if (prevVote === 'upvote' && voted === 'none') {
        return unUpvoteComment(data.commentid);
      } else if (prevVote === 'downvote' && voted === 'none') {
        return unDownvoteComment(data.commentid);
      } else if (prevVote === 'upvote') {
        return swapCommentVoteUpToDown(data.commentid);
      } else if (prevVote === 'downvote') {
        return swapCommentVoteDownToUp(data.commentid);
      }
    })
}

const unUpvoteComment = (commentid) => {
  console.log('UNUP:', commentid);
  return knex('comments')
    .where({id: commentid})
    .decrement('up_votes', 1)
    // .update({'up_votes': knex.raw('up_votes - 1')})
    .returning('*')
    .then(data => {
      console.log('Data:', data);
      return data;
    })
}

const unDownvoteComment = (commentid) => {
  console.log('UNDOWN:', commentid);
  return knex('comments')
    .where({ id: commentid })
    .increment('down_votes', 1)
    // .update({'down_votes': knex.raw('down_votes + 1')})
    .returning('*')
    .then(data => {
      console.log('Data:', data);
      return data;
    })
}

const swapCommentVoteUpToDown = (commentid) => {
  console.log('SWAP U2D:', commentid);
  return knex('comments')
    .where({ id: commentid })
    .update({
      'down_votes': knex.raw('down_votes - 1'),
      'up_votes': knex.raw('up_votes - 1')
    })
    .returning('*')
    .then(data => {
      console.log('Data:', data);
      return data;
    })
}

const swapCommentVoteDownToUp = (commentid) => {
  console.log('SWAP D2U:', commentid);
  return knex('comments')
    .where({ id: commentid })
    .update({
      'down_votes': knex.raw('down_votes + 1'),
      'up_votes': knex.raw('up_votes + 1')
    })
    .returning('*')
    .then(data => {
      console.log('Data:', data);
      return data;
    })
}

module.exports = {
  updateEntryVote,
  updateCommentVote
}


//For testing:
// updateCommentVote(5, 137, 'upvote', 'none');
// unUpvoteComment(137);
// swapCommentVoteDownToUp(138);
// swapCommentVoteUpToDown(138);
