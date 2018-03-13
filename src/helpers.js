export const constructQueryJson = (queryObj) => {
  if (queryObj.queryInput.value) {
    const termQuery = {
      bool: {
        must: [
          {
            match: {
              [queryObj.queryInput.term]: queryObj.queryInput.value
            }
          }
        ]
      },
    };
    return termQuery;
  }
  return {
    match_all: {}
  };
};

export const constructAggregationsJson = (stateObject, queryJson) => {
  const aggregations = getAggregations(stateObject);
  const aggregationQueryJson = aggregations.map((query, index) => {
    const json = JSON.parse(query);
    if (index === 0) {
      queryJson.aggs = json.aggs;
    } else {
      const firstKey = Object.keys(json.aggs)[0];
      queryJson.aggs[firstKey + '-' + index] = json.aggs[firstKey];
    }
  });
}

export const constructFiltersJson = (stateObject, queryJson) => {
  let filters = stateObject.filters.filter((filter) => {
    return filter.value;
  });
  filters = filters.map((filter) => {
    return {
      term: {
        [filter.term]: filter.value
      }
    };
  });
  if (queryJson.query.bool) {
    queryJson.query.bool['filter'] = filters;
  } else {
    queryJson.query = {
      bool: {
        must: [
          {
            match_all: {}
          }
        ],
        filter: filters
      }
    };
  }
}

const getAggregations = (stateObject) => {
  const aggregations = [];
  for (let index = 0; index < stateObject.aggregations.length; index++) {
    aggregations.push(JSON.stringify(getAggregationJson(stateObject.aggregations[index]), null, '\t'));
  }
  return aggregations;
}

const getAggregationJson = (aggs) => {
  let aggsArray = getAggregationTerm(aggs, []);
  let aggsObj = aggsArray[aggsArray.length - 1];
  for (let index = aggsArray.length - 2; index >= 0; index--) {
    aggsArray[index][Object.keys(aggsArray[index])[0]].aggs = aggsObj;
    aggsObj = aggsArray[index];
  }
  return {
    aggs: aggsObj
  };
}
const getAggregationTerm = (aggs, arr) => {
  arr.push(buildAggsJson(aggs.selectedValue));
  if (aggs.subAggs.length > 0) {
    getAggregationTerm(aggs.subAggs[0], arr);
  }
  return arr;
}

const buildAggsJson = (selectedValue) => {
  return {
    [selectedValue]: {
      terms: {
        field: selectedValue
      }
    }
  };
}