import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import './App.css';


class Infocard extends React.Component {
constructor (props) {
    super(props);
      this.state = {
    open: false,
  };
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
		width:'341px',
		textAlign:'left',
		alignItems: 'center',
		minHeight:'550px',
		maxHeight: '550px',
		margin: '35px',
		backgroundColor: '#fff'
		};

		const imgstyle = {
			width: '340px',
			height: '340px',
			justifyContent: 'center'
		}

		return (
			<div style={style}>
			<img src = {this.props.img} style={imgstyle}/>
			<section className="resInfo">
			<h1 id="restaurantName">{this.props.name}</h1>
			<p>{this.props.address[0]} {this.props.address[1]}</p>
			<p>Price: {this.props.price}</p>
			<p>Rating: {this.props.rating}</p>
			<p>{this.props.isClosed}</p>
			<button onClick={this.onOpenModal}>More Info</button>
        <Modal open={this.state.open} onClose={this.onCloseModal} center>
     <section style={{
            width: '100%',
            height: '600px',
            paddingLeft: '110px',
            paddingRight: '110px'}}>
          <h1>{this.props.name}</h1>
        
        </section>
        </Modal>
			</section>
			</div>
			);
	}
};


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    locValue: '',
    termValue: '',
    comments: [], 
    name: '', 
    img: '',
    price: '',
    rating: '',
    address: ''
    };

    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCityChange(event) {
    this.setState({locValue: event.target.value});
  }

  handleTermChange(event) {
  	this.setState({termValue: event.target.value});
  }
 
  handleSubmit(event) {
  	const self = this;
    	axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=50&term=' + this.state.termValue + '&location=' + this.state.locValue,{
        headers: {
            Authorization: `Bearer 9ieIkr1BsBWuaxHVV5ZG7iMast3LnfMUDcBC7McTVr8HGg3SjluntY3zlLg6eSf2u2OzH3OGzWY5vMzBRDWloXXzyx6pwOyVp2jM5lgwXaMbdQX4685510z5Xf7oW3Yx`
        }
    })

    .then(function (res){
        console.log(res)
       let restaurants = res.data.businesses.map(function(place){
      	console.log(place.name);
      	self.setState({comments: res.data.businesses,
      		name: res.data.businesses.name,
      		img: res.data.businesses.image_url,
      		price: res.data.businesses.price,
      		rating: res.data.businesses.rating,
      		address: res.data.businesses.display_address
      	})
      	return restaurants;
    });
    })
    .catch(function(err){
        console.log(err)
    })
    event.preventDefault();
    console.log(this.state.city);
  } 


  render() {
  	{/*const options = this.state.comments.map((item, index) => <li key={index}>{`${item.name}`}</li>)*/}
  	const options = this.state.comments.map((item, index) =>        <Infocard
          key={index}
          name={item.name}
          img={item.image_url}
          price={item.price}
          rating={item.rating}
          address={item.location.display_address}
        />)

 			const container = {
			display:'flex',
			flexDirection:'row',
			alignContent:'center',
			justifyContent:'center',
			textAlign:'center'
		};

{/*<h1>Results for {this.state.termValue.charAt(0).toUpperCase() + this.state.termValue.slice(1)} in {this.state.locValue}</h1>*/}

    return (
    <div>
    <p id="instruction">Enter what you're in the mood for and your city to see your options!</p>
      <form onSubmit={this.handleSubmit}>
      		<input id="search-field" className="col col-6" type="text" placeholder="What do you feel like?" value={this.state.value} onChange={this.handleTermChange} required autocomplete="off"/>
          <input id="search-field" className="col col-6" type="text" placeholder="Enter City Name" value={this.state.value} onChange={this.handleCityChange} required autocomplete="off"/>
        <input id="submitButton" type="submit" value="Submit"/>
      </form>    
 <div style={container}>
 <div className="row align-items-center justify-content-center">
 {options}
 </div>
 </div>
 </div>
    );
  }
}



export default SearchBar;