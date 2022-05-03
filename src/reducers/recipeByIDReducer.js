import { REQUEST_RECIPE_BY_ID,
  REQUEST_RECIPE_BY_ID_SUCCESS,
  REQUEST_RECIPE_BY_ID_FAILURE } from '../actions/index.actions';

const INICIAL_STATE = {
  recipe: [],
  error: '',
};

const recipeByIDReducer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_RECIPE_BY_ID:
    return { ...state };
  case REQUEST_RECIPE_BY_ID_SUCCESS:
    return {
      ...state,
      recipe: action.recipe.meals,
    };
  case REQUEST_RECIPE_BY_ID_FAILURE:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default recipeByIDReducer;
