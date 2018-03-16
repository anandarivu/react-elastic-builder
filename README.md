# react-elastic-builder 1.0

This project helps in building Elastic Search JSON Body involving query, filters & aggregations. This provides a User Interface, driven by ReactJS, to create complex JSON using simple UI elements like text fields and dropdowns.

## Features
User Interface provides an option to create Elastic Search JSON Body for the fields configured in ```./data/fields.js``` using
- Query with match terms
- Filters with exact match
- Multiple & Nested Aggregations
- Copy the JSON created into clipboard

## Installation Steps
Steps to start the local node server on 3000 port.
- ```npm install```
- ```npm start```
- Access URL: ```http://localhost:3000``` in browser

## Examples

Any change in UI components, will directly reflect in the right section where JSON is being built.

- On initial load of page

![Initial Load](/docs/screenshots/initial_page.png)

- Provide search term by selecting the field in ```Query Term``` dropdown and type in value. 

![Query Term](/docs/screenshots/query_term.png)

- Click ```Add Filters``` to add multiple filters. Currently this project supports just ```match``` terms.

![Query Term](/docs/screenshots/add_filters.png)

- Click ```Add Aggregations``` to add aggregations to query. It supports both ```nested``` & ```multiple``` aggregations as shown below.

Nested Aggregations
![Query Term](/docs/screenshots/nested_aggregations.png)

Multiple Aggregations
![Query Term](/docs/screenshots/multiple_aggregations.png)