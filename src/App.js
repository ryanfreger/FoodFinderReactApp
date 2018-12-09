import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './header.js'
import SearchResults from './SearchResults.js';
import Infocard from './InfoCard.js';
import Recipecard from './RecipeCard.js';
import Modal from 'react-responsive-modal';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <SearchResults />
      </div>
    );
  }
}

export default App;



