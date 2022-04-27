import { fetchRecipe, fetchCocktail } from '../services/API';

export const REQUEST_RECIPE = 'REQUEST_RECIPE';
export const REQUEST_RECIPE_SUCCESS = 'REQUEST_RECIPE_SUCCESS';
export const REQUEST_RECIPE_FAILURE = 'REQUEST_RECIPE_FAILURE';
export const REQUEST_COCKTAIL = 'REQUEST_COCKTAIL';
export const REQUEST_COCKTAIL_SUCCESS = 'REQUEST_COCKTAIL_SUCCESS';
export const REQUEST_COCKTAIL_FAILURE = 'REQUEST_COCKTAIL_FAILURE';

export const requestRecipe = () => ({
  type: REQUEST_RECIPE,
});

export const requestRecipeSuccess = (recipe) => ({
  type: REQUEST_RECIPE_SUCCESS,
  recipe,
});

export const requestRecipeFailure = (error) => ({
  type: REQUEST_RECIPE_FAILURE,
  error,
});

export function recipeThunk(searchValue) {
  return async (dispatch) => {
    try {
      const response = await fetchRecipe(searchValue);
      dispatch(requestRecipeSuccess(response));
    } catch (error) {
      dispatch(requestRecipeFailure(error));
    }
  };
}

export const requestCocktail = () => ({
  type: REQUEST_COCKTAIL,
});

export const requestCocktailSuccess = (Cocktail) => ({
  type: REQUEST_COCKTAIL_SUCCESS,
  Cocktail,
});

export const requestCocktailFailure = (error) => ({
  type: REQUEST_COCKTAIL_FAILURE,
  error,
});

export function cocktailThunk(searchValue) {
  return async (dispatch) => {
    try {
      const response = await fetchCocktail(searchValue);
      dispatch(requestCocktailSuccess(response));
    } catch (error) {
      dispatch(requestCocktailFailure(error));
    }
  };
}
