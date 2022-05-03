import { REQUEST_INGREDIENTS_LIST,
  REQUEST_INGREDIENTS_LIST_SUCCESS,
  REQUEST_INGREDIENTS_LIST_FAILURE,
} from '../actions/index.actions';

const INICIAL_STATE = {
  ingredients: [],
  error: '',
};

const ingredientsReducer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_INGREDIENTS_LIST:
    return { ...state };
  case REQUEST_INGREDIENTS_LIST_SUCCESS:
    return {
      ...state,
      ingredients: action.ingredients,
    };
  case REQUEST_INGREDIENTS_LIST_FAILURE:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default ingredientsReducer;
