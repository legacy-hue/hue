import React from 'react';
import Entry from './Entry.jsx';
import { Divider, Form, Label, Button, Header, Menu } from 'semantic-ui-react'

const EntryList = (props) => (
  <div className="ui segment">
	  {console.log('Entries:', props.data)}
    {props.data.map((data, index) => 
    	<Entry 
    		key = {index} 
    		data={data} 
    		user={props.user} 
    		deleteEntry={props.deleteEntry} 
    		getEntries={props.getEntries}
    	/>
    )}
  </div>
);

export default EntryList;
