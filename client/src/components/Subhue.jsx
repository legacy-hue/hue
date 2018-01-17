import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Form, Label, Button, Header, Menu } from 'semantic-ui-react'
import EntryList from './EntryList.jsx';
// import { Feed, Icon, Divider, Comment, Tab } from 'semantic-ui-react'

// import Entry from './Entry.jsx';
// import CommentEntry from './CommentEntry.jsx';
// import CommentData from './CommentData.jsx';

// class Subhue extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       subhueName: 'home',
//       entries: [],
//       redirect: false
//     };
//     // this.handleClick = this.handleClick.bind(this);
//   }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subhueName: 'home',
      entries: [],
      redirect: false
    };
  }

  componentDidMount() {
    this.props.authorize()
  }

  componentWillReceiveProps(nextprops){
    this.props.getSubhueEntries(nextprops.match.params.name)
    .then(data => {
      console.log('subhue entries data: ', data.data);
      //   if(data.data.length === 0){
      //     this.setState({redirect:  true});
      //   }
      //   return data;
      }
    )
    // .then(data => this.setState({entry: data.data}));

    // this.props.getUserComments(nextprops.match.params.name)
    // .then(data => this.setState({comments: data.data}));
  }

  render (props) {
    return (  
      <div />
    );
  }
}

export default Home;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // componentDidMount() {
  //   this.props.authorize()
  //   this.props.getUserEntries(this.props.match.params.name)
  //   .then(data => {
  //       if(data.data.length === 0){
  //         this.setState({redirect:  true});
  //       }
  //       return data;
  //     }
  //   )
  //   .then(data => this.setState({entries: data.data}));
    
  //   this.props.getUserComments(this.props.match.params.name)
  //   .then(data => this.setState({comments: data.data}));
  // }

  // componentWillReceiveProps(nextprops){
  //   this.props.getUserEntries(nextprops.match.params.name)
  //   .then(data => {
  //       if(data.data.length === 0){
  //         this.setState({redirect:  true});
  //       }
  //       return data;
  //     }
  //   )
  //   .then(data => this.setState({entry: data.data}));

  //   this.props.getUserComments(nextprops.match.params.name)
  //   .then(data => this.setState({comments: data.data}));
  // }

  // handleClick() {
  //   // this.props.deleteEntry(this.props.data.id)
  //   // .then(() => console.log('handleClick ran'));
  // }

//   render (props) {
//     const panes = [
//       {menuItem: 'Entries', render: () => {
//         return (
//           <div>
//             <div>
//               <br />
//               {this.state.entries.map((entry, index) => 
//                 <Entry 
//                   key={index} 
//                   data={entry} 
//                   user={this.props.user} 
//                   deleteEntry={this.props.deleteEntry}
//                 />)}
//             </div>
//           </div>
//         )
//       }},
//       {menuItem: 'Comments', render: () => {
//         return(
//           <div>
//             <div>
//             <Comment.Group>
//               {this.state.comments.map((comment, index) => {
//                 return ( <div key={index}>
//                 <CommentData 
//                   comment = {comment}
//                   getEntry={this.props.getEntry}
//                 />
//                 <CommentEntry
//                   comment = {comment}
//                   user = {this.props.user}
//                   deleteComment = {this.props.deleteComment}
//                   entry={comment.entryid}
//                 /> 
//                 <Divider></Divider>
//                 </div>
//                 )}
//               )}
//             </Comment.Group>
//             </div>
//           </div>
//         )
//       }}
//     ]


//     return (
//       <div className = 'ui segment'>
//       <h4>User Profile for {this.props.match.params.name}</h4>
//       <Tab panes={panes} />
//       </div>
//     )
//   }
// }

// export default UserProfile;
