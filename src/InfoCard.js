import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import './App.css';


class Infocard extends React.Component {
constructor (props) {
    super(props);
      this.state = {
    open: false,
    isOpen: false,
    placeID: '',
    webSite: '',
    latitude : '',
    longitude: '',
    isLoaded: false
  };

  
  const GOOGLE_KEY = process.env.REACT_APP_GOOGLE_KEY;



  this.handleGetInfo = this.handleGetInfo.bind(this);
  this.handleGoogleInfo = this.handleGoogleInfo.bind(this);
  this.handlePlaceDetails = this.handlePlaceDetails.bind(this);
  }


  onOpenModal = () => {
    this.handleGetInfo();
    this.handleGoogleInfo();
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

   handleGetInfo(event) {
  	const self = this;
    const YELP_KEY = process.env.REACT_APP_YELP_KEY;
    	axios.get('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/' + this.props.id,{
        headers: {
            Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`
        }
    })

    .then(function (res){
        console.log(res)
      	self.setState({isOpen:res.data.hours[0].is_open_now,
          isLoaded: true
        });
    })
    .catch(function(err){
        console.log(err)
    })
  } 

  handleGoogleInfo(event) {
    const self=this;
    axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${this.props.name}&inputtype=textquery&fields=photos,id,place_id,formatted_address,name,rating,opening_hours,geometry&locationbias=circle:2000@${this.state.yelpLatitude},${this.state.yelpLongitude}&key=${process.env.REACT_APP_GOOGLE_KEY}`)
    .then(function (res){
        console.log(res)
        self.setState({
          placeID: res.data.candidates[0].place_id,
          latitude: res.data.candidates[0].geometry.location.lat,
          longitude: res.data.candidates[0].geometry.location.lng
        });
        self.handlePlaceDetails();
    })
    .catch(function(err){
        console.log(err)
    })
  }

  handlePlaceDetails(event) {
    const self=this;
    axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${this.state.placeID}&key=${process.env.REACT_APP_GOOGLE_KEY}`)
    .then(function (res){
        console.log(res)
        self.setState({
          webSite: res.data.result.website
        });
    })
    .catch(function(err){
        console.log(err)
    })
  }

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

		const red = {
			color: 'red'
		}

		const green = {
			color: 'green'
		}

		return (
      
			<div style={style}>
			<img src = {this.props.img} style={imgstyle}/>
			<section className="resInfo">
			<p id="restaurantName">{this.props.name}</p>
			<p>{this.props.address[0]} {this.props.address[1]}</p>
			<p>Price: {this.props.price}</p>
			<p>Rating: {this.props.rating}</p>
			<p>{this.props.isClosed}</p>
			<button id="moreInfo" onClick={this.onOpenModal}>More Info</button>
        <Modal open={this.state.open} onClose={this.onCloseModal} center>
        {this.state.isLoaded ? 
        <div>
        
        {/*<img style={{width:'100%'}} src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.latitude},${this.state.longitude}&zoom=14&size=250x170&markers=size:mid%7Ccolor:0xff0000%7%7C5${this.props.name}&key=${process.env.REACT_APP_GOOGLE_KEY}`}/>*/}
        <div>
        {this.state.placeID ? <img style={{width:'100%'}} src={`https://maps.googleapis.com/maps/api/staticmap?size=250x170&scale=1&format=png&maptype=roadmap&markers=size:normal%7Ccolor:red%7C|scale:2|${this.state.latitude},${this.state.longitude}|&key=${process.env.REACT_APP_GOOGLE_KEY}`}/> 
        : null 
}        </div>
     <section style={{
            width: '100%',
            maxWidth: '100%',
            minWidth: '300px',
            height: '235px',
            paddingRight: '110px'}}>
          <h1 style={{fontSize:'20px'}}>{this.props.name}</h1>
          <p>Rating: {this.props.rating} - Total Reviews: {this.props.reviewCount}</p>
          <p>Phone: {this.props.phone}</p>
          <section style={this.state.isOpen ? green : red}>
          <p>{this.state.isOpen ? 'Currently Open' : 'Currently Closed'}</p>
          </section>
           <a href={this.props.yelpURL} target='blank'>Yelp Page</a>
           <br/>
           <p>{this.state.webSite ? <a href={this.state.webSite} target='blank'>Website</a> : null}</p>
        </section>
        </div>
        :
        <div>
        <img src="https://www.idlewild.org/wp-content/plugins/embed-bible-passages/images/ajax-loading.gif"/>
        </div>
      }
        </Modal>
			</section>
			</div>
			);
	}
};


export default Infocard;