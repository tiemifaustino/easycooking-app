import {
  REQUEST_INGREDIENTS_LIST_SUCCESS,
  REQUEST_INGREDIENTS_LIST_FAILURE,
  REQUEST_INGREDIENTS_DRINKS_SUCCESS,
  REQUEST_INGREDIENTS_DRINKS_FAILURE,
} from '../actions/actionType';

const INICIAL_STATE = {
  ingredients: [],
  drinksIngredients: [],
  error: '',
};

const ingredientsReducer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_INGREDIENTS_LIST_SUCCESS:
    return {
      ...state,
      ingredients: action.ingredients,
    };
  case REQUEST_INGREDIENTS_DRINKS_SUCCESS:
    return {
      ...state,
      drinksIngredients: action.drinksIngredients,
    };
  case REQUEST_INGREDIENTS_LIST_FAILURE || REQUEST_INGREDIENTS_DRINKS_FAILURE:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default ingredientsReducer;
