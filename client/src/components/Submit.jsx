import React from 'react';

var Submit = (props) => (
  <div>
    <div>
      <h4>Submit</h4>
      Title: <input onChange={props.titleChange}/>
      <br/>
      URL: <input onChange={props.urlChange}/>
      <br/>
      Text: <input onChange={props.textChange}/>
      <br/>
      <br/>
      <button onClick={() => {props.submit()}}>submit</button>
    </div>
  </div>
)

export default Submit;