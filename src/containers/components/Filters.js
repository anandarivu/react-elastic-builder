import React from 'react';

export default class Filters extends React.Component {
  render() {
    const filters = this.displayFilters(this.props.filters, this.props.fields);
    return (
      <div>
        <button type="button" onClick={this.props.onAdditionOfFilter}>Add Filters</button>
        <div>{filters}</div>
      </div>
    );
  }
  displayFilters = (filters, fields) => {
    const filterItems = this.displayFilterItems(filters, fields);
    return (
      <div>
        {filterItems}
      </div>
    );
  }
  displayFilterItems = (filters) => {
    const fieldItems = this.props.fields.map((field) => {
      return <option key={field} value={field}>{field}</option>
    });

    return filters.map((filter, index) => {
      return (
        <div key={index}>
          <select key={index} value={filter.term} onChange={(e) => this.props.onFilterUpdate(e, index, 'term')}>{fieldItems}</select>
          <input type="text" name="queryInput" value={filter.value} onChange={(e) => this.props.onFilterUpdate(e, index, 'value')} />
        </div>
      );
    });
  }
}