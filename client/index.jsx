import React from ('react');
import Login from ('./components/Login.jsx');

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