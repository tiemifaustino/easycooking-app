import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';
import cocktailReducer from './cocktailReducer';
import recipeSupriseReducer from './recipeSupriseReducer';
import cocktailSupriseReducer from './cocktailSupriseReducer';
import recipeListAreaReducer from './recipeListAreaReducer';
import recipeNationalityReducer from './recipeNationalityReducer';

const rootReducer = combineReducers({
  recipeReducer,
  cocktailReducer,
  recipeSupriseReducer,
  cocktailSupriseReducer,
  recipeListAreaReducer,
  recipeNationalityReducer,
});

export default rootReducer;
