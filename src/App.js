import React, { Component } from 'react';
import Pagination from './Pagination.js';
import Table from './Table.js';

class App extends Component {
  render() {
    return (
      <div>
        <h1>
          All about TV shows
        </h1>
        <Table />
        <Pagination />
      </div>
    );
  }
}

export default App;
