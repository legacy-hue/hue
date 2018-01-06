import React from 'react';


class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <div className="entry">
        <div className="txn-data">{this.props.data.title}</div>
      </div>
    );
  }
}

export default TransactionEntry;
