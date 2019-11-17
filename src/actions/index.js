import axios from 'axios';
export const SEARCH_FOOD = 'SEARCH_FOOD';
export const SEARCH_ERROR = 'SEARCH_ERROR';
export const LOADING = 'LOADING';

//Actions for Search
export function searchFood(term, location) {

    const request = 
    axios.all([
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=36&term=${term}&location=${location}&categories=Food`, {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_YELP_KEY}`
            }
        }),
        axios.get(`https://api.edamam.com/search?q=${term}&to=24&app_id=0781af48&app_key=5467ed1db8c5043cbf84cd24f07153e4`, {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_EDAMAM_KEY}`
            }
        })
    ])
    return {
        type: SEARCH_FOOD,
        payload: request
    };
    // console.log(request);
    // if ((request.status && request.status === 200) || (request && request.data)) {
    //     return {
    //         type: SEARCH_FOOD,
    //         payload: request
    //     };
    // } else {
    //     return { type: SEARCH_ERROR, payload: null }
    // }
    //     if(request.status === 200) {
        // return {
        //     type: SEARCH_FOOD,
        //     payload: request
        // };
    // } else {
    //     return {type: SEARCH_ERROR,payload:null}
    // }
}



export function loading() {
    return {
        type: LOADING,
        payload: null
    }
}

export function searchError() {
    return {
        type: SEARCH_ERROR,
        payload: null
    }
}