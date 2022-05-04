import { REQUEST_RECIPE,
  REQUEST_RECIPE_SUCCESS,
  REQUEST_RECIPE_FAILURE } from '../actions/actionType';

const INICIAL_STATE = {
  recipe: [],
  error: '',
};

const recipeReducer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_RECIPE:
    return { ...state };
  case REQUEST_RECIPE_SUCCESS:
    return {
      ...state,
      recipe: action.recipe,
    };
  case REQUEST_RECIPE_FAILURE:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default recipeReducer;
