import { REQUEST_RECIPE_NATIONALITY,
  REQUEST_RECIPE_NATIONALITY_SUCCESS,
  REQUEST_RECIPE_NATIONALITY_FAILURE } from '../actions/index.actions';

const INICIAL_STATE = {
  recipeNationality: [],
  error: '',
};

const recipeNationalityReducer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_RECIPE_NATIONALITY:
    return { ...state };
  case REQUEST_RECIPE_NATIONALITY_SUCCESS:
    return {
      ...state,
      recipeNationality: action.recipeNationality,
    };
  case REQUEST_RECIPE_NATIONALITY_FAILURE:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default recipeNationalityReducer;
