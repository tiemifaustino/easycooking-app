import {
  fetchRecipe,
  fetchCocktail,
  fetchRecipeByID,
  fetchCocktailByID } from '../services/API';

export const REQUEST_RECIPE = 'REQUEST_RECIPE';
export const REQUEST_RECIPE_SUCCESS = 'REQUEST_RECIPE_SUCCESS';
export const REQUEST_RECIPE_FAILURE = 'REQUEST_RECIPE_FAILURE';
export const REQUEST_COCKTAIL = 'REQUEST_COCKTAIL';
export const REQUEST_COCKTAIL_SUCCESS = 'REQUEST_COCKTAIL_SUCCESS';
export const REQUEST_COCKTAIL_FAILURE = 'REQUEST_COCKTAIL_FAILURE';
export const REQUEST_RECIPE_BY_ID = 'REQUEST_RECIPE_BY_ID';
export const REQUEST_RECIPE_BY_ID_SUCCESS = 'REQUEST_RECIPE_BY_ID_SUCCESS';
export const REQUEST_RECIPE_BY_ID_FAILURE = 'REQUEST_RECIPE_BY_ID_FAILURE';
export const REQUEST_COCKTAIL_BY_ID = 'REQUEST_COCKTAIL_BY_ID';
export const REQUEST_COCKTAIL_BY_ID_SUCCESS = 'REQUEST_COCKTAIL_BY_ID_SUCCESS';
export const REQUEST_COCKTAIL_BY_ID_FAILURE = 'REQUEST_COCKTAIL_BY_ID_FAILURE';

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

export const requestCocktailSuccess = (cocktail) => ({
  type: REQUEST_COCKTAIL_SUCCESS,
  cocktail,
});

export const requestCocktailFailure = () => ({
  type: REQUEST_COCKTAIL_FAILURE,
  error: 'Sorry, we haven\'t found any recipes for these filters.',
});

export function cocktailThunk(searchValue) {
  return async (dispatch) => {
    try {
      const response = await fetchCocktail(searchValue);
      dispatch(requestCocktailSuccess(response));
    } catch (error) {
      dispatch(requestCocktailFailure());
    }
  };
}

export const requestRecipeByID = () => ({
  type: REQUEST_RECIPE_BY_ID,
});

export const requestRecipeByIDSuccess = (cocktail) => ({
  type: REQUEST_RECIPE_BY_ID_SUCCESS,
  cocktail,
});

export const requestRecipeByIDFailure = (error) => ({
  type: REQUEST_RECIPE_BY_ID_FAILURE,
  error,
});

export function requestRecipeByIDThunk(id) {
  return async (dispatch) => {
    try {
      const response = await fetchRecipeByID(id);
      dispatch(requestRecipeByIDSuccess(response));
    } catch (error) {
      dispatch(requestRecipeByIDFailure(error));
    }
  };
}

//
export const requestCocktailByID = () => ({
  type: REQUEST_COCKTAIL_BY_ID,
});

export const requestCocktailByIDSuccess = (cocktail) => ({
  type: REQUEST_COCKTAIL_BY_ID_SUCCESS,
  cocktail,
});

export const requestCocktailByIDFailure = (error) => ({
  type: REQUEST_COCKTAIL_BY_ID_FAILURE,
  error,
});

export function requestCocktailByIDThunk(id) {
  return async (dispatch) => {
    try {
      const response = await fetchCocktailByID(id);
      dispatch(requestCocktailByIDSuccess(response));
    } catch (error) {
      dispatch(requestCocktailByIDFailure(error));
    }
  };
}
