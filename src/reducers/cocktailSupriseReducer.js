import { REQUEST_COCKTAIL_SUPRISE,
  REQUEST_COCKTAIL_SUPRISE_SUCCESS,
  REQUEST_COCKTAIL_SUPRISE_FAILURE } from '../actions/index.actions';

const INICIAL_STATE = {
  cocktailSuprise: [],
  error: '',
};

const cocktailSupriseReducer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_COCKTAIL_SUPRISE:
    return { ...state };
  case REQUEST_COCKTAIL_SUPRISE_SUCCESS:
    return {
      ...state,
      cocktailSuprise: action.cocktailSuprise,
    };
  case REQUEST_COCKTAIL_SUPRISE_FAILURE:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default cocktailSupriseReducer;
