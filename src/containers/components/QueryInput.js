import React from 'react';

export default class QueryInput extends React.Component {
  render(){
  const fieldItems = this.props.fields.map((field) => {
    return <option key={field} value={field}>{field}</option>
  });
    return (
      <div id="query-input">
        Query Term:<br/>
        <select onChange={(e) => this.props.onQueryUpdate(e, 'term')} value={this.props.queryInput.term}>{fieldItems}</select>
        <input type="text" name="queryInput" value={this.props.queryInput.value} onChange={(e) => this.props.onQueryUpdate(e, 'value')}/>
      </div>
    );
  }
}