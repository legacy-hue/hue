import React from 'react';

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
    this.props.postEntry(this.state.title, this.state.url, this.state.text);
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

  render () {
    return (
      <div>
        <div>
          <h4>Submit</h4>
          Title: <input onChange={this.titleChange}/>
          <br/>
          URL: <input onChange={this.urlChange}/>
          <br/>
          Text: <input onChange={this.textChange}/>
          <br/>
          <br/>
          <button onClick={this.handleClick}>submit</button>
        </div>
      </div>
    );
  }
}


export default Submit;