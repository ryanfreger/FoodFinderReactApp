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

  //Functions that change state of open of Modal
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
		  }

   		const imgstyle = {
  			width: '360px',
  			height: '320px',
  			justifyContent: 'center'
		  }

		  const block = {
  			display: 'block',
  			marginTop:'20px'
		  }

  {/* Create <li> tags with all items in ingrediantList for the recipe */}
		let ingredients = this.props.ingredientList.map((item, index) => (
        <li className="smaller-font" key={index}>{item}</li>
    ));

    {/* Create <p> tags with all items in dietLabels for the recipe */}
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
            {/* Conditionals for all 3 macronutrients incase one or some are missing and others are not */}
            {this.props.totalFat ?
     				<p className="card-info">Fat: {Math.floor(this.props.totalFat)},</p> : null }
            {this.props.totalCarbs ?
     				<p className="card-info"> Carbs: {Math.floor(this.props.totalCarbs)},</p> : null }
            {this.props.totalProtein ?
     				<p className="card-info"> Protein: {Math.floor(this.props.totalProtein)}</p> : null }
     				</span> : null }
            {/*clicking this button upens the Modal*/}
     				<button style={block} id="moreInfo" onClick={this.onOpenModal}>Ingredients</button>
   				</section>
   				<Modal open={this.state.open} onClose={this.onCloseModal} center>
     				<div>
     				<section className="align-items-center justify-content-center" style={{
  		            width: '100%',
  		            maxWidth: '100%',
  		            minWidth: '300px',
  		            height: '465px',
  		            paddingRight: '110px'}}>
            <h2>Ingredients</h2>
     				<ul>
     				{ingredients}
     				</ul>
     				</section>
     				</div>
   				</Modal>
   			</div>
   			)
   	}
}

export default Recipecard;