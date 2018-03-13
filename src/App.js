import React from 'react';
import ElasticBuilder from './containers/ElasticBuilder';
import { fields } from './data/fields';

export default class App extends React.Component {
  render() {
    return (
      <ElasticBuilder fields={fields}/>
    );
  }
}