import { REQUEST_RECIPE_LIST_AREA,
  REQUEST_RECIPE_LIST_AREA_SUCCESS,
  REQUEST_RECIPE_LIST_AREA_FAILURE } from '../actions/actionType';

const INICIAL_STATE = {
  recipeArea: [],
  error: '',
};

const recipeListAreaReducer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_RECIPE_LIST_AREA:
    return { ...state };
  case REQUEST_RECIPE_LIST_AREA_SUCCESS:
    return {
      ...state,
      recipeArea: action.recipe,
    };
  case REQUEST_RECIPE_LIST_AREA_FAILURE:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default recipeListAreaReducer;
