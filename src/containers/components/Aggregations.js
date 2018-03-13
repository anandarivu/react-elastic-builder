import React from 'react';

export default class Aggregations extends React.Component {
  render() {
    const aggregations = this.renderAggs(this.props.aggregations, 0, []);
    return (
      <div>
        <button type="button" onClick={this.props.onAdditionOfAggregation}>Add Aggregations</button><br/>
        <div>{aggregations}</div>
      </div>
    );
  }
  renderAggs = (aggregations, level, arr) => {
    const fieldItems = this.props.fields.map((field) => {
      return <option value={field}>{field}</option>
    });
    return aggregations.map((aggregation, i) => {
      const indexArray = arr.slice(0);
      indexArray.push(i);
      let subAggs;
      let showSubAggsButton = false;
      if (aggregation.subAggs.length > 0) {
        subAggs = this.renderAggs(aggregation.subAggs, level + 1, indexArray);
      } else {
        if (level < 5) {
          showSubAggsButton = true;
        }
      }
      return (
        <div style={{marginLeft: aggregation.marginLeft + 'px'}}>
          <select onChange={(e) => this.props.onUpdateOfAggregation(indexArray, e.target.value)} key={level + '-' + i}>{fieldItems}</select>
          {
            showSubAggsButton &&
            <div style={{marginLeft: '10px', display: 'inline-block'}}>
              <button type="button" onClick={() => this.props.onAdditionOfSubAggregation(indexArray)}>Sub Aggregations</button>
            </div>
          }
          {subAggs}
        </div>
      );
    });
  }
}