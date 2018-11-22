import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchResults.js';

class Header extends Component {
	render() {
		return (
		<div className="App">
        	<header className="App-header">
          	{/*<img src={logo} className="App-logo" alt="logo" />*/}
          	<img src="http://nereg.lib.ms.us/wp-content/uploads/2017/05/lunch-break-3.png" className="App-logo"/>
         	 <h1 id="title">
           		 Food Finder
          	</h1>
  
        </header>
      </div>
			);
	}
}

export default Header;