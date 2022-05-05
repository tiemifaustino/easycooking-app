import { REQUEST_RECIPE_SUPRISE,
  REQUEST_RECIPE_SUPRISE_SUCCESS,
  REQUEST_RECIPE_SUPRISE_FAILURE } from '../actions/actionType';

const INICIAL_STATE = {
  recipeSuprise: [],
  error: '',
};

const recipeSupriseReducer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_RECIPE_SUPRISE:
    return { ...state };
  case REQUEST_RECIPE_SUPRISE_SUCCESS:
    return {
      ...state,
      recipeSuprise: action.recipeSuprise,
    };
  case REQUEST_RECIPE_SUPRISE_FAILURE:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default recipeSupriseReducer;
