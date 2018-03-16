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
- On initial load of page
![Initial Load](/docs/screenshots/initial_page.png)