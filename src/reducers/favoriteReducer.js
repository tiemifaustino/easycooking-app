import { STATE_FAVORITE_RECIPES } from '../actions/actionType';

const INICIAL_STATE = {
  favoriteRecipes: JSON.parse(localStorage.getItem('favoriteRecipes')) || [],
};

const favoriteReducer = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case STATE_FAVORITE_RECIPES:
    return { ...state, favoriteRecipes: action.favorite };
  default:
    return state;
  }
};

export default favoriteReducer;
