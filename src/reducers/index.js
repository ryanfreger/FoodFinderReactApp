import { combineReducers } from 'redux';
import SearchResult_reducer from './SearchResult_reducer';
import InfoCard_reducer from './InfoCard_reducer';
import RecipeCard_reducer from './RecipeCard_reducer';

const rootReducer = combineReducers({
    SearchResult_reducer,
    InfoCard_reducer,
    RecipeCard_reducer
    });
    
export default rootReducer;