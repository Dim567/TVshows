import React, { Component } from 'react';
import Pagination from './Pagination.js';
import Table from './Table.js';
import Search from './Search';
import Loader from './loader';

class App extends Component {
  render() {
    return (
      <div>
        <h1 className="Header">
          Popular TV shows
        </h1>
        <Search />
        <Table />
        <Pagination />
        <Loader />
      </div>
    );
  }
}

export default App;
