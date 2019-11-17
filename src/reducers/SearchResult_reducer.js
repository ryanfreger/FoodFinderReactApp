import {  SEARCH_FOOD, LOADING, SEARCH_ERROR } from '../actions'

const defaultState = {
    restaurants: [],
    isLoaded: true,
    errorMessage: '',
    recipes: []
}


export default function (state = defaultState, action) {
    console.log(action);
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                isLoaded: false
            }
        case SEARCH_FOOD:
            return {
                ...state,
                isLoaded: true,
                restaurants: action.payload[0].data.businesses,
                recipes: action.payload[1].data.hits
            }
        case SEARCH_ERROR:
            return {
                ...state,
                errorMessage: 'Something went wrong',
                isLoaded: true
            }
        default:
            return state;
    }
}