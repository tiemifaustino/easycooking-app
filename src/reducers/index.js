import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';
import cocktailReducer from './cocktailReducer';
import recipeByIDReducer from './recipeByIDReducer';
import cocktailByIDReducer from './cocktailByIDReducer';
import recipeSupriseReducer from './recipeSupriseReducer';
import cocktailSupriseReducer from './cocktailSupriseReducer';

const rootReducer = combineReducers({
  recipeReducer,
  cocktailReducer,
  recipeSupriseReducer,
  cocktailSupriseReducer,
  recipeByIDReducer,
  cocktailByIDReducer,
});

export default rootReducer;
