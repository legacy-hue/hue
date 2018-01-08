import React from 'react';
import Entry from './Entry.jsx';

const EntryList = (props) => (
  <div>
    {props.data.map((data, index) => <Entry key = {index} data={data} setEntry={props.setEntry}/>)}
  </div>
);

export default EntryList;
