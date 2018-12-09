import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import './App.css';
import Infocard from './InfoCard.js';

//console.log(process.env.REACT_APP_YELP_KEY);



class SearchResults extends React.Component {
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
    address: '',
    phone: '',
    isClosed: false,
    yelpURL: '',
    reviewCount: '',
    id: '',
    cityName: '',
    stateName: '',
    isLoaded: false,
    errorMessage: '',
    isLoaded: ''
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
    event.preventDefault();
    const self = this;
    self.setState({isLoaded: false})
    //const YELP_KEY = process.env.REACT_APP_YELP_KEY;
      axios.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=50&term=${this.state.termValue}&location=${this.state.locValue}&categories=Food`,{
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`
        }
    })
    .then(function (res){
        console.log(res)
       let restaurants = res.data.businesses.map(function(place){
        self.setState({comments: res.data.businesses,
          name: res.data.businesses.name,
          img: res.data.businesses.image_url,
          price: res.data.businesses.price,
          rating: res.data.businesses.rating,
          address: res.data.businesses.display_address,
          phone: res.data.businesses.display_phone,
          isClosed: res.data.businesses.is_closed,
          yelpURL: res.data.businesses.url ,
          reviewCount: res.data.businesses.review_count,
          id: res.data.businesses.id,
          cityName: res.data.businesses.city,
          stateName: res.data.businesses.state,
          isLoaded: true,
          errorMessage:''
        })
    });       
    })
    .catch(function(err){
        console.log(err)
        self.setState({
          errorMessage: 'Something went wrong!'
        })
    })
    
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
          phone={item.display_phone}
          isClosed={item.is_closed}
          yelpURL={item.url}
          reviewCount={item.review_count}
          id={item.id}
          city={item.city}
          stateName={item.state}
          yelpLatitude={item.yelpLatitude}
          yelpLongitude={item.yelpLongitude}
        />)

      const container = {
      display:'flex',
      flexDirection:'row',
      alignContent:'center',
      justifyContent:'center',
      textAlign:'center'
    };

{/*<h1>Results for {this.state.termValue.charAt(0).toUpperCase() + this.state.termValue.slice(1)} in {this.state.locValue}</h1>*/}

if(this.state.errorMessage !== '') {
  return (<div><form onSubmit={this.handleSubmit}>
          <input id="search-field" className="col col-6" type="text" placeholder="What do you feel like?" value={this.state.value} onChange={this.handleTermChange} required autoComplete="off"/>
          <input id="search-field" className="col col-6" type="text" placeholder="Enter City Name" value={this.state.value} onChange={this.handleCityChange} required autoComplete="off"/>
        <input id="submitButton" type="submit" value="Submit"/>
      </form> <div className="row align-items-center justify-content-center"><h1>{this.state.errorMessage}</h1></div></div>);
}

    return (
    <div>
    <p id="instruction">Enter what you're in the mood for and your city to see your options!</p>
      <form onSubmit={this.handleSubmit}>
          <input id="search-field" className="col col-6" type="text" placeholder="What do you feel like?" value={this.state.value} onChange={this.handleTermChange} required autoComplete="off"/>
          <input id="search-field" className="col col-6" type="text" placeholder="Enter City Name" value={this.state.value} onChange={this.handleCityChange} required autoComplete="off"/>
        <input id="submitButton" type="submit" value="Submit"/>
      </form> 
{this.state.isLoaded !== false ?
 <div style={container}>
 <div className="row align-items-center justify-content-center">
 
{options}
 </div>
 </div>
 : <div className="row align-items-center justify-content-center"><img src="https://www.idlewild.org/wp-content/plugins/embed-bible-passages/images/ajax-loading.gif"/> </div>}
 </div>
    );
  }
}



export default SearchResults;