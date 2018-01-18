import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Form, Label, Button, Header, Menu, Feed, Icon, Tab } from 'semantic-ui-react'



class Inbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'inbox',
      title: '',
      text: '',
      recipient: ''
    }
    this.titleChange = this.titleChange.bind(this);
    this.textChange = this.textChange.bind(this);
    this.recipientChange = this.recipientChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // const {history} = this.props;
    // this.props.postEntry(this.state.title, this.state.url, this.state.text, this.props.currentSub)
    // .then((res) => {
    //   if(res.data === 'success'){
    //     this.props.getEntries()
    //       .then(() => history.push('/'));
    //   }
    // });
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
              <div>
                
              </div>
            )
          }},
          {menuItem: 'Compose', render: () => {
            return(
              <div className='topGap'>
                <Form>
                  <Form.Field>
                    <label>Recipient</label>
                    <input placeholder='Recipient' onChange={this.recipientChange} />
                  </Form.Field>
                  <Form.Field>
                    <label>Subject</label>
                    <input placeholder='Subject' onChange={this.titleChange}/>
                  </Form.Field>
                  
                  <Form.TextArea label='Text' placeholder='Type your message here...' onChange={this.textChange}/>
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
          },
          {menuItem: 'Trash', render: () => {
            return (
                <div>
                  
                </div>
              )
          }}
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
