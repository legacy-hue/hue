import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home.jsx'
import Login from './components/Login.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
  	return (
  <div>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/login" component={Login}/>
    </Switch>
  </div>
  	)
  }
}

//ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('app'))

  // <div>
  //   <nav>
  //     <Link to="/login">login</Link>
  //   </nav>
  //   <div>
  //     <Route path="/login" component={Login}/>
  //   </div>
  // </div>