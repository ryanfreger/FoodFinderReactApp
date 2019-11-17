import React, { Component } from 'react';

class SearchBar extends Component {

  state = {
    location: '', //Will hold value in Location TextInput
    term: '' //Will hold value in Term TextInput

  }
  //State for what is in input for term
  handleTermChange = (event) => {
    this.setState({ term: event.target.value });
  }

  //State for what is in input for location
  handleCityChange = (event) => {
    this.setState({ location: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.callback(this.state.term, this.state.location);
  }

  render() {
    return (
      <div>
        <p id="instruction">Enter what you're in the mood for and your city to see your options.</p>
        <p id="instruction">Find both restaurants and recipes for what you're craving!</p>
        {/* Form with 2 Text Inputs and Button. Button onClick will kick off API requests to Yelp, Edamam*/}
        <form onSubmit={this.handleSubmit}>
          <input
            id="search-field"
            className="col col-6"
            type="text"
            placeholder="What do you feel like?"
            value={this.state.value}
            onChange={this.handleTermChange}
            required
            autoComplete="off" />
          <input
            id="search-field"
            className="col col-6"
            type="text"
            placeholder="Enter City Name"
            value={this.state.value}
            onChange={this.handleCityChange}
            required
            autoComplete="off" />
          <input id="submitButton" type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default SearchBar;