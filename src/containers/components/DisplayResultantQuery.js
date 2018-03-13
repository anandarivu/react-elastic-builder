import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import * as helpers from '../../helpers';

export default class DisplayResultantQuery extends React.Component {

  render() {
    return (
      <div>
        {this.displayResultantQueryJson()}
      </div>
    );
  }
  displayResultantQueryJson = () => {
    let queryJson = {
      query: helpers.constructQueryJson(this.props.results)
    };
    helpers.constructAggregationsJson(this.props.results, queryJson);
    helpers.constructFiltersJson(this.props.results, queryJson);
    const jsonString = JSON.stringify(queryJson, undefined, 2);
    return (
      <div>
        <CopyToClipboard
          onCopy={this.copyToClipboard}
          text={jsonString}
        >
          <button type="button">Copy</button>
        </CopyToClipboard>
        <pre>
          {jsonString}
        </pre>
      </div>
    );
  }
}