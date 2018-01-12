import React from 'react';
import { Divider, Form, Label, Button, Header, Menu } from 'semantic-ui-react'

class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      url: '',
      text: '',
    };
    this.titleChange = this.titleChange.bind(this);
    this.urlChange = this.urlChange.bind(this);
    this.textChange = this.textChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {history} = this.props;
    this.props.postEntry(this.state.title, this.state.url, this.state.text)
    .then((res) => {
      if(res.data === 'success'){
        this.props.getEntries();
        history.push('/');
      }
    });
  }

  titleChange(input) {
    this.setState({
      title: input.target.value
    });
  }

  urlChange(input) {
    this.setState({
      url: input.target.value
    });
  }

  textChange(input) {
    this.setState({
      text: input.target.value
    });
  }

  componentDidMount() {
    this.props.authorize()
  }

  render () {
    return (
      <div className="ui segment">
        <div>
          <h4>Submit</h4>
          <Form>
            <Form.Field>
              <label>Title</label>
              <input placeholder='This is a site about cats' onChange={this.titleChange}/>
            </Form.Field>
            <Form.Field>
              <label>URL</label>
              <input placeholder='cats.com' onChange={this.urlChange}/>
            </Form.Field>
            <Form.TextArea label='Text' placeholder='how neat is that...' onChange={this.textChange}/>
            <Form.Field>
              <Button onClick={this.handleClick}>submit</Button>
            </Form.Field>
          </Form>
        </div>
      </div>
    );
  }
}

export default Submit;
