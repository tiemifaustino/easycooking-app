import { REQUEST_COCKTAIL_BY_ID,
  REQUEST_COCKTAIL_BY_ID_SUCCESS,
  REQUEST_COCKTAIL_BY_ID_FAILURE } from '../actions/actionType';

const INICIAL_STATE = {
  cocktail: [],
  error: '',
};

const cocktailByIDReducer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_COCKTAIL_BY_ID:
    return { ...state };
  case REQUEST_COCKTAIL_BY_ID_SUCCESS:
    return {
      ...state,
      cocktail: action.cocktail.drinks,
    };
  case REQUEST_COCKTAIL_BY_ID_FAILURE:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default cocktailByIDReducer;
