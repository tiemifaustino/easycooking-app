import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';
import cocktailReducer from './cocktailReducer';
import recipeByIDReducer from './recipeByIDReducer';
import cocktailByIDReducer from './cocktailByIDReducer';

const rootReducer = combineReducers({ recipeReducer,
  cocktailReducer,
  recipeByIDReducer,
  cocktailByIDReducer,
});

export default rootReducer;
