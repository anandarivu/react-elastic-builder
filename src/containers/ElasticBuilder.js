import React from 'react';

import ResetQuery from './components/ResetQuery';
import QueryInput from './components/QueryInput';
import Aggregations from './components/Aggregations';
import Filters from './components/Filters';
import DisplayResultantQuery from './components/DisplayResultantQuery';

export default class ElasticBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>React Elastic Builder</h1>
        </header>
        <div className="row">
          <div className="col-xs-4" style={{height: '450px', overflow: "auto"}}>
            <h1>Query Parameters</h1>
            {this.renderResetQueryComponent()}
            <br />
            {this.renderQueryInputComponent()}
            <br />
            {this.renderFiltersComponent()}
            <br />
            {this.renderAggregationsComponent()}
          </div>
          <div className="col-xs-8" style={{height: '450px', overflow: "auto"}}>
            <h1>Query JSON</h1>
            {this.renderResultantQueryComponent()}
          </div>
        </div>
        <footer>
          Copyright &copy; Anand
        </footer>
      </div>
    );
  }

  renderResetQueryComponent = () => {
    return (
      <div>
        <ResetQuery
          onResetClick={this.resetQuery}
        />
      </div>
    );
  }

  renderQueryInputComponent = () => {
    return (
      <div>
        <QueryInput
          fields={this.props.fields}
          queryInput={this.state.queryInput}
          onQueryUpdate={this.onQueryUpdate}
        />
      </div>
    );
  }

  renderAggregationsComponent = () => {
    return (
      <Aggregations
        aggregations={this.state.aggregations}
        fields={this.props.fields}
        onAdditionOfAggregation={this.addAggregationTerm}
        onUpdateOfAggregation={this.updateAggregationTerm}
        onAdditionOfSubAggregation={this.addSubAggregationTerm}
      />
    );
  }

  renderFiltersComponent = () => {
    return (
      <Filters
        fields={this.props.fields}
        filters={this.state.filters}
        onAdditionOfFilter={this.addFilterTerm}
        onFilterUpdate={this.onFilterUpdate}
      />
    );
  }

  renderResultantQueryComponent = () => {
    return (
      <DisplayResultantQuery
        results={this.state}
      />
    );
  }

  resetQuery = () => {
    this.setState(this.getInitialState());
  }

  getInitialState = () => {
    return {
      queryInput: {
        term: 'brand_id',
        value: ''
      },
      aggregations: [],
      filters: []
    };
  }

  onQueryUpdate = (event, key) => {
    const newQuery = this.state.queryInput;
    newQuery[key] = event.target.value;
    this.setState({
      queryInput: newQuery
    });
  }

  addAggregationTerm = () => {
    const aggregations = this.state.aggregations;
    aggregations.push({
      selectedValue: this.props.fields[0],
      subAggs: [],
      marginLeft: 0
    });
    this.setState({
      aggregations
    });
  }

  updateAggregationTerm = (indexArray, newValue) => {
    this.setState({
      aggregations: this.updateSelectedAggregation(this.state.aggregations, indexArray, newValue)
    });
  }

  addSubAggregationTerm = (arr) => {
    const updatedAggs = this.addSubAggregations(this.state.aggregations, arr);
    this.setState({
      aggregations: updatedAggs
    });
  }

  addFilterTerm = () => {
    const filters = this.state.filters;
    filters.push({
      term: this.props.fields[0],
      value: ''
    });
    this.setState({
      filters
    });
  }

  onFilterUpdate = (event, index, key) => {
    const newFilters = this.state.filters.slice(0);
    newFilters[index][key] = event.target.value;
    this.setState({
      filters: newFilters
    });
  }

  addSubAggregations = (aggs, arr) => {
    const updatedAggs = aggs.map((agg, index) => {
      if (index === arr[0]) {
        if (arr.length > 1) {
          agg.subAggs = this.addSubAggregations(agg.subAggs, arr.slice(1));
        } else {
          agg.subAggs.push({
            selectedValue: this.props.fields[0],
            subAggs: [],
            marginLeft: 10
          });
        }
      }
      return agg;
    });
    return updatedAggs;
  }
  updateSelectedAggregation = (aggs, arr, newValue) => {
    const updatedAggs = aggs.map((agg, index) => {
      if (index === arr[0]) {
        if (arr.length > 1) {
          agg.subAggs = this.updateSelectedAggregation(agg.subAggs, arr.slice(1), newValue);
        } else {
          agg.selectedValue = newValue;
        }
      }
      return agg;
    });
    return updatedAggs;
  }
}
