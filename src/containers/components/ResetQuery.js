import React from 'react';

export default class ResetQuery extends React.Component {
  render() {
    return (
      <div>
        <a onClick={this.props.onResetClick} href="#">Reset</a>
      </div>
    );
  }
}