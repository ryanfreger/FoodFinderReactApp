import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import './App.css';
import Infocard from './InfoCard.js';
import Recipecard from './RecipeCard.js';
//console.log(process.env.REACT_APP_YELP_KEY);

class Tabs extends React.Component {
  constructor(props) {
    super();
    this.state = {
      active: 0
    }
  }
  
  select = (i) => {
    let _this = this;
    return function() {
      _this.setState({
        active: i
      });
    }
  }
  
  renderTabs = () => {
    return React.Children.map(this.props.children, (item, i) => {
      if (i%2 === 0) {
        let active = this.state.active === i ? 'active' : '';
        return <a onClick={this.select(i)} className={`${active} tab`}>{item}</a>;
      }
    });
  }
  
  renderContent() {
    return React.Children.map(this.props.children, (item, i) => {
      if (i-1 === this.state.active) {
        return <div className='content'>{item}</div>;
      } else {
        return;
      }
    });
  }
  
  render() {
    return (
      <div className="tabs">
        {this.renderTabs()}
        {this.renderContent()}
      </div>
    );
  }
}



class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    locValue: '',
    termValue: '',
    restaurants: [], 
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
    isLoaded: 0,
    recipes: [],
    recipeLabel: '',
    recipeImg: '',
    ingrediantList: [],
    recipeCalories: '',
    yield: '',
    dietLabels: [],
    totalFat: '',
    totalCarbs: '',
    totalProtein: ''
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
    axios.all([
      axios.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=50&term=${this.state.termValue}&location=${this.state.locValue}&categories=Food`,{
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`
        }
    }),
      axios.get(`https://api.edamam.com/search?q=${this.state.termValue}&to=50&app_id=0781af48&app_key=5467ed1db8c5043cbf84cd24f07153e4`)
      ])
    .then(axios.spread(function (res,edamam){
        //console.log(res)
        if(res.data.businesses.length >= 1) {
        let restaurants = res.data.businesses.map(function(place){
        self.setState({
          restaurants: res.data.businesses,
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
      //console.log(edamam.data.hits)
      let recipes = edamam.data.hits.map(function(recipe){
        //console.log(edamam.data.hits)
        self.setState({
          recipes: edamam.data.hits,
          recipeLabel: recipe.recipe.label,
          recipeImg: recipe.recipe.image,
          ingrediantList: recipe.recipe.ingredientLines,
          recipeCalories: recipe.recipe.calories,
          yield: recipe.recipe.yield,
          dietLabels: recipe.recipe.dietLabels,
          totalFat: recipe.recipe.totalNutrients.FAT.quantity,
          totalCarbs: recipe.recipe.totalNutrients.CHOCDF.quantity,
          totalProtein: recipe.recipe.totalNutrients.PROCNT.quantity
        })
      })
} else {self.setState({
  errorMessage:`No results found for ${self.state.termValue} in ${self.state.locValue}!`})}
    }))
    .catch(function(err){
        console.log(err)
        self.setState({
          errorMessage: 'Something went wrong!',
          isLoaded: ''
        })
    })
    
  } 

  render() {
    const options = this.state.restaurants.map((item, index) =>  <Infocard
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

    const rec = this.state.recipes.map((item, index) => 
      <Recipecard
      key={index}
      recipeLabel={item.recipe.label}
      recipeImg={item.recipe.image}
      ingrediantList={item.recipe.ingredientLines}
      recipeCalories={item.recipe.calories}
      yield={item.recipe.yield}
      dietLabels={item.recipe.dietLabels}
      totalFat={item.recipe.totalNutrients.FAT.quantity}
      totalCarbs={item.recipe.totalNutrients.CHOCDF.quantity}
      totalProtein={item.recipe.totalNutrients.PROCNT.quantity}
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
      </form> <div className="row align-items-center justify-content-center"><h1 style={container}>{this.state.errorMessage}</h1></div></div>);
}

    return (
    <div>
    <p id="instruction">Enter what you're in the mood for and your city to see your options!</p>
      <form onSubmit={this.handleSubmit}>
          <input id="search-field" className="col col-6" type="text" placeholder="What do you feel like?" value={this.state.value} onChange={this.handleTermChange} required autoComplete="off"/>
          <input id="search-field" className="col col-6" type="text" placeholder="Enter City Name" value={this.state.value} onChange={this.handleCityChange} required autoComplete="off"/>
        <input id="submitButton" type="submit" value="Submit"/>
      </form> 
{this.state.isLoaded !== false  ?
 <div style={container}>
 <div>
 {options.length > 0 ? 
 <Tabs>Eat Out
 <div className="row align-items-center justify-content-center">
{options}
</div>
Dine In
<div className="row align-items-center justify-content-center">
{rec}
</div>
</Tabs> : null }
 </div>
 </div>
 : <div className="row align-items-center justify-content-center"><img src="https://www.idlewild.org/wp-content/plugins/embed-bible-passages/images/ajax-loading.gif"/> </div>}
 </div>
    );
  }
}



export default SearchResults;