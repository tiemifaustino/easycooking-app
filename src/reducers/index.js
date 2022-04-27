import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';
import cocktailReducer from './cocktailReducer';

const rootReducer = combineReducers({ recipeReducer, cocktailReducer });

export default rootReducer;
