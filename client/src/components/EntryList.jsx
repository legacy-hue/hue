import React from 'react';
import Entry from './Entry.jsx';
import styles from 'styled-components';

const Wrapper = styles.div`
  border: 15px black;
`;

const EntryList = (props) => (
  <Wrapper className="myList">
    {props.data.map((data, index) => <Entry key = {index} data={data} user={props.user} deleteEntry={props.deleteEntry}/>)}
  </Wrapper>
);

export default EntryList;
