import React from 'react';
import Entry from './Entry.jsx';
import styles from 'styled-components';

const Wrapper = styles.div`
  border: 15px black;
`;

const EntryList = (props) => (
  <Wrapper>
    {props.data.map((data, index) => <Entry key = {index} data={data} setEntry={props.setEntry}/>)}
  </Wrapper>
);

export default EntryList;
