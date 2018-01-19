import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Form, Label, Button, Header, Menu, Feed } from 'semantic-ui-react'
import EntryList from './EntryList.jsx';
import UserProfile from './UserProfile.jsx';



class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render (props) {
    if (this.props.data.length === 0) {
      return (
          <h1>Sorry, no results found!</h1>
        )
    }

    return (  
      <div>
        {this.props.data.user.length
          ?
            <div>
              <h3>Users</h3>
              {this.props.data.user.map((user) => {
                return (
                    <div className='usernameBox' key={user.name}>
                    <Feed>
                      <Feed.Event>
                        <Feed.Content>
                          <Feed.Extra text>
                            <Link className='usernameList' to={`/user/${user.name}`}>{user.name}</Link>
                          </Feed.Extra>
                          <Feed.Meta>
                          </Feed.Meta>
                        </Feed.Content>
                      </Feed.Event>
                    </Feed>
                    </div>
                  )
              })}
            </div>
          : null
        }
        {this.props.data.posts.length 
          ?
            <div className='postArea'>
              <h3>Posts</h3>
              <EntryList 
                data = {this.props.data.posts}
                user = {this.props.user}
                deleteEntry = {this.props.deleteEntry}
                getEntries = {this.props.getEntries}
              />
            </div>
          : null
        }
      </div>
    );
  }
}

export default SearchResults;
