import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import './App.css';

class Recipecard extends React.Component {
constructor (props) {
    super(props);
    this.state = {
    open: false
}
}

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

   	render() {

   		const style = {
			border:'1px solid lightgray',
			width:'361px',
			textAlign:'left',
			alignItems: 'center',
			minHeight:'560px',
			maxHeight: '560px',
			margin: '35px',
			backgroundColor: '#fff'
		};

   		const imgstyle = {
			width: '360px',
			height: '320px',
			justifyContent: 'center'
		}

		const block = {
			display: 'block',
			marginTop:'20px'
		}

		let ingrediants = this.props.ingrediantList.map((item, index) => (
        <li key={index}>{item}</li>
    ));

    	let labelsDiet = this.props.dietLabels.map((item, index) => (
        <p key={index}>Diet: {item}</p>
    ));


   		return(
   			<div style={style}>
   				<img src = {this.props.recipeImg} style={imgstyle}/>
   				<section className="resInfo">
   				<p id="restaurantName">{this.props.recipeLabel}</p>
   				<p className="card-info">Calories: {Math.floor(this.props.recipeCalories)} - Serves {this.props.yield}</p>
   				{this.props.dietLabels ?
   				<span className="card-info">{labelsDiet}</span> : null }
   				{this.props.totalFat || this.props.totalCarbs || this.props.totalProtein ?
   				<span id="nutrients">
          {this.props.totalFat ?
   				<p className="card-info">Fat: {Math.floor(this.props.totalFat)},</p> : null }
   				<p className="card-info"> Carbs: {Math.floor(this.props.totalCarbs)},</p>
   				<p className="card-info"> Protein: {Math.floor(this.props.totalProtein)}</p>
   				</span> : null }
   				<button style={block} id="moreInfo" onClick={this.onOpenModal}>Ingrediants</button>
   				</section>
   				<Modal open={this.state.open} onClose={this.onCloseModal} center>
   				<div>
   				<section style={{
		            width: '100%',
		            maxWidth: '100%',
		            minWidth: '300px',
		            height: '235px',
		            paddingRight: '110px'}}>
   				<ul>
   				{ingrediants}
   				</ul>
   				</section>
   				</div>
   				</Modal>
   			</div>
   			)
   	}


}

export default Recipecard;