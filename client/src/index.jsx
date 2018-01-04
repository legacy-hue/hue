import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';

import Login from './components/Login.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
  	return (
      <div>
        <Login></Login>
      </div>
  	)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
// ReactDOM.render((
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// ), document.getElementById('app'))

