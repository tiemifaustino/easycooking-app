import {
  fetchCocktail, fetchCocktailByID, fetchRecipe, fetchRecipeByID,
  fetchRecipeSuprise, fetchCocktailSuprise, fetchRecipeListArea, fetchRecipeByNationality,
} from '../services/API';

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
export const REQUEST_RECIPE_SUPRISE = 'REQUEST_RECIPE_SUPRISE';
export const REQUEST_RECIPE_SUPRISE_SUCCESS = 'REQUEST_RECIPE_SUPRISE_SUCCESS';
export const REQUEST_RECIPE_SUPRISE_FAILURE = 'REQUEST_RECIPE_SUPRISE_FAILURE';
export const REQUEST_COCKTAIL_SUPRISE = 'REQUEST_COCKTAIL_SUPRISE';
export const REQUEST_COCKTAIL_SUPRISE_SUCCESS = 'REQUEST_COCKTAIL_SUPRISE_SUCCESS';
export const REQUEST_COCKTAIL_SUPRISE_FAILURE = 'REQUEST_COCKTAIL_SUPRISE_FAILURE';
export const REQUEST_RECIPE_LIST_AREA = 'REQUEST_RECIPE_LIST_AREA';
export const REQUEST_RECIPE_LIST_AREA_SUCCESS = 'REQUEST_RECIPE_LIST_AREA_SUCCESS';
export const REQUEST_RECIPE_LIST_AREA_FAILURE = 'REQUEST_RECIPE_LIST_AREA_FAILURE';
export const REQUEST_RECIPE_NATIONALITY = 'REQUEST_RECIPE_NATIONALITY';
export const REQUEST_RECIPE_NATIONALITY_SUCCESS = 'REQUEST_RECIPE_NATIONALITY_SUCCESS';
export const REQUEST_RECIPE_NATIONALITY_FAILURE = 'REQUEST_RECIPE_NATIONALITY_FAILURE';

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

// Recipe and Drink Suprise
export const requestRecipeSuprise = () => ({
  type: REQUEST_RECIPE_SUPRISE,
});

export const requestRecipeSupriseSuccess = (recipeSuprise) => ({
  type: REQUEST_RECIPE_SUPRISE_SUCCESS,
  recipeSuprise,
});

export const requestRecipeSupriseFailure = (error) => ({
  type: REQUEST_RECIPE_SUPRISE_FAILURE,
  error,
});

export function requestRecipeSupriseThunk() {
  return async (dispatch) => {
    try {
      const response = await fetchRecipeSuprise();
      dispatch(requestRecipeSupriseSuccess(response));
    } catch (error) {
      dispatch(requestRecipeSupriseFailure(error));
    }
  };
}

export const requestCocktailSuprise = () => ({
  type: REQUEST_COCKTAIL_SUPRISE,
});

export const requestCocktailSupriseSuccess = (cocktailSuprise) => ({
  type: REQUEST_COCKTAIL_SUPRISE_SUCCESS,
  cocktailSuprise,
});

export const requestCocktailSupriseFailure = (error) => ({
  type: REQUEST_COCKTAIL_SUPRISE_FAILURE,
  error,
});

export function requestCocktailSupriseThunk() {
  return async (dispatch) => {
    try {
      const response = await fetchCocktailSuprise();
      dispatch(requestCocktailSupriseSuccess(response));
    } catch (error) {
      dispatch(requestCocktailSupriseFailure(error));
    }
  };
}

export const requestRecipeListArea = () => ({
  type: REQUEST_RECIPE_LIST_AREA,
});

export const requestRecipeListAreaSuccess = (recipe) => ({
  type: REQUEST_RECIPE_LIST_AREA_SUCCESS,
  recipe: recipe.meals,
});

export const requestRecipeListAreaFailure = (error) => ({
  type: REQUEST_RECIPE_LIST_AREA_FAILURE,
  error,
});

export function requestRecipeListAreaThunk(area) {
  return async (dispatch) => {
    try {
      const response = await fetchRecipeListArea(area);
      dispatch(requestRecipeListAreaSuccess(response));
    } catch (error) {
      dispatch(requestRecipeListAreaFailure(error));
    }
  };
}

export const requestRecipeNationality = () => ({
  type: REQUEST_RECIPE_NATIONALITY,
});

export const requestRecipeNationalitySuccess = (recipe) => ({
  type: REQUEST_RECIPE_NATIONALITY_SUCCESS,
  recipeNationality: recipe.meals,
});

export const requestRecipeNationalityFailure = (error) => ({
  type: REQUEST_RECIPE_NATIONALITY_FAILURE,
  error,
});

export function requestRecipeByNationalityThunk(area) {
  return async (dispatch) => {
    try {
      const response = await fetchRecipeByNationality(area);
      dispatch(requestRecipeNationalitySuccess(response));
    } catch (error) {
      dispatch(requestRecipeNationalityFailure(error));
    }
  };
}
