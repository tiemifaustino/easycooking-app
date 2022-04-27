import { REQUEST_COCKTAIL,
  REQUEST_COCKTAIL_SUCCESS,
  REQUEST_COCKTAIL_FAILURE } from '../actions/index.actions';

const INICIAL_STATE = {
  cocktail: [],
  error: '',
};

const cocktailReducer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_COCKTAIL:
    return { ...state };
  case REQUEST_COCKTAIL_SUCCESS:
    return {
      ...state,
      cocktail: action.cocktail,
    };
  case REQUEST_COCKTAIL_FAILURE:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default cocktailReducer;
