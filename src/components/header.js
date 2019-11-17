import React, { Component } from 'react';
import '../App.css';

class Header extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src="http://nereg.lib.ms.us/wp-content/uploads/2017/05/lunch-break-3.png" className="App-logo" />
					<h1 id="title">Food Finder</h1>

				</header>
			</div>
		);
	}
}

// const Header = () => (
// 	<div className='App'>
// 		<header className='App-header'>
// 		<img src='https://enterprisectr.org/wp-content/uploads/2016/04/foood.png' className="App-logo' />
// 		<h1 id='title'></h1>
// 		</header>
// 	</div>
// )

export default Header;