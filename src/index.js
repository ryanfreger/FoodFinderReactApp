// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import * as serviceWorker from './serviceWorker';
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
// import promiseMiddleware from 'redux-promise';

// import reducers from './reducers'

// const storeWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

// ReactDOM.render(
//     <Provider store={storeWithMiddleware(reducers)}>
//         <App />
//     </Provider>, 
//     document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();



import React from 'react';
import ReactDOM from 'react-dom';

// Redux stuff
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';

import App from './App'
import reducers from './reducers';

import './index.css';

const storeWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);

ReactDOM.render(
  <Provider store={storeWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.getElementById('root')
);