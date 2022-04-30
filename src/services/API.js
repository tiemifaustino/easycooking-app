export async function fetchRecipe(searchValue) {
  let URL = '';
  if (searchValue.typeInput === 'Ingredient') URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue.search}`;
  if (searchValue.typeInput === 'Name') URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue.search}`;
  if (searchValue.typeInput === 'First Letter') URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue.search}`;
  const response = await fetch(URL);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
}

export async function fetchCocktail(searchValue) {
  let URL = '';
  if (searchValue.typeInput === 'Ingredient') URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchValue.search}`;
  if (searchValue.typeInput === 'Name') URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue.search}`;
  if (searchValue.typeInput === 'First Letter') URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchValue.search}`;
  const response = await fetch(URL);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
}

export async function fetchRecipeByID(id) {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(URL);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
}

export async function fetchCocktailByID(id) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(URL);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
}

export async function fetchRecipeSuprise() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const response = await fetch(URL);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
}

export async function fetchCocktailSuprise() {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const response = await fetch(URL);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
}

export async function fetchRecipeListArea(area) {
  const URL = `https://www.themealdb.com/api/json/v1/1/list.php?a=${area}`;
  const response = await fetch(URL);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
}

export async function fetchRecipeByNationality(nationality) {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian${nationality}`;
  const response = await fetch(URL);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
}
