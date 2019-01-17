import React, { Component } from 'react';
import Pagination from './Pagination.js';
import Table from './Table.js';
import Search from './Search';

class App extends Component {
  render() {
    return (
      <div>
        <h1>
          All about TV shows
        </h1>
        <Search />
        <Table />
        <Pagination />
      </div>
    );
  }
}

export default App;
