import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Form, Label, Button, Header, Menu, Feed, Icon, Tab } from 'semantic-ui-react';
import axios from 'axios';

class Inbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'inbox',
      title: '',
      text: '',
      recipient: '',
      inbox: []
    }
    this.titleChange = this.titleChange.bind(this);
    this.textChange = this.textChange.bind(this);
    this.recipientChange = this.recipientChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount (props) {
    axios.post('/getMessages', {sender: this.props.user})
    .then((results) => {
      console.log(results.data);
      this.setState({
        inbox: results.data
      })
    })
  }

  handleClick() {
    this.props.sendMessage({
      recipient: this.state.recipient,
      sender: this.props.user,
      text: this.state.text,
      title: this.state.title
    })
    this.setState({
      recipient: '',
      title: '',
      text: ''
    })
  }

  titleChange(input) {
    this.setState({
      title: input.target.value
    });
  }

  textChange(input) {
    this.setState({
      text: input.target.value
    });
  }

  recipientChange (input) {
    this.setState({
      recipient: input.target.value
    })
  }

  render (props) {
    const panes = [
          {menuItem: 'Inbox', render: () => {
            return (
              <div className='inboxBox'>
                {this.state.inbox.reverse().map((message) => {
                  return (
                    <div key={message.id}>
                      <Feed.Event>
                        <Feed.Content>
                          <Feed.Summary>
                              <div className='entireHeader'>
                                <span className='subjectHeader'>{message.subject}</span> <span className='fromHeader'>from {message.name}</span>
                              </div>
                          </Feed.Summary>
                          <Feed.Extra text>
                            <div className='messageBody'>
                              {message.text}
                            </div>
                          </Feed.Extra>
                        </Feed.Content>
                      </Feed.Event>
                      <Divider></Divider>
                    </div>
                    )
                })}
              </div>
            )
          }},
          {menuItem: 'Compose', render: () => {
            return(
              <div className='topGap'>
                <Form>
                  <Form.Field>
                    <label>Recipient</label>
                    <input placeholder='Recipient' value={this.state.recipient} onChange={this.recipientChange} />
                  </Form.Field>
                  <Form.Field>
                    <label>Subject</label>
                    <input placeholder='Subject' value={this.state.title} onChange={this.titleChange}/>
                  </Form.Field>
                  
                  <Form.TextArea label='Text' value={this.state.text} placeholder='Type your message here...' onChange={this.textChange}/>
                  <Form.Field>
                    <Button onClick={this.handleClick}>Send!</Button>
                  </Form.Field>
                </Form>
              </div>
            )
          }},
          {
            menuItem: 'Sent', render: () => {
              return (
                <div>
                  
                </div>
              )
            }
          }
        ]


        return (
          <div className = 'ui segment'>
          <h4>Inbox for {this.props.user}</h4>
          <Tab panes={panes} />
          </div>
        )
      }
}

export default Inbox;
