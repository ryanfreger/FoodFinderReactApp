import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header.js'
import SearchBar from './SearchResults.js';
import InfoCard from './SearchResults.js';
import Modal from 'react-responsive-modal';


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <SearchBar />
      </div>
    );
  }
}

export default App;
