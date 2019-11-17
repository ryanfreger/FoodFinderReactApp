import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchFood, loading } from './actions';
import SearchResults from './components/SearchResults';
import Header from './components/header'

class SearchResultContainer extends Component {

    //Function that is used to send API requests to Yelp and Edamam
    //Calls props.loading() first until a response is received to show Loading Spinner
    searchFoodBoth = (term, location) => {
        this.props.loading();
        this.props.searchFood(term, location);
    }

    render() {
        return (
            <div>
                <Header />
                <SearchResults
                    {...this.props}
                    searchFoodBoth={this.searchFoodBoth}
                    restaurants={this.props.restaurants}
                    recipes={this.props.recipes}
                    errorMessage={this.props.errorMessage}
                    isLoaded={this.props.isLoaded}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        restaurants: state.SearchResult_reducer.restaurants,
        recipes: state.SearchResult_reducer.recipes,
        isLoaded: state.SearchResult_reducer.isLoaded,
        errorMessage: state.SearchResult_reducer.errorMessage,
    }
}

const mapDispatchToProps = {
    searchFood,
    loading
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchResultContainer)