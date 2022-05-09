import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';
import cocktailReducer from './cocktailReducer';
import recipeByIDReducer from './recipeByIDReducer';
import cocktailByIDReducer from './cocktailByIDReducer';
import recipeSupriseReducer from './recipeSupriseReducer';
import cocktailSupriseReducer from './cocktailSupriseReducer';
import recipeListAreaReducer from './recipeListAreaReducer';
import recipeNationalityReducer from './recipeNationalityReducer';
import ingredientsReducer from './ingredientsReducer';
import filterReducer from './filterReducer';
import favoriteReducer from './favoriteReducer';

const rootReducer = combineReducers({
  recipeReducer,
  cocktailReducer,
  recipeSupriseReducer,
  cocktailSupriseReducer,
  recipeListAreaReducer,
  recipeNationalityReducer,
  ingredientsReducer,
  recipeByIDReducer,
  cocktailByIDReducer,
  filterReducer,
  favoriteReducer,
});

export default rootReducer;
