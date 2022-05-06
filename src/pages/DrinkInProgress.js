import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InProgress from '../components/InProgress';
import { fetchCocktailByID } from '../services/API';

function DrinkInProgress() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState();
  const [saveLocalStorage, setSaveLocalStorage] = useState({ cocktails: {}, meals: {} });

  useEffect(() => {
    const AllRecipeDrink = async () => {
      const fetchAPI = await fetchCocktailByID(id);
      const APIRecipeByID = fetchAPI.drinks[0];
      const ingredients = Object
        .keys(APIRecipeByID).filter((key) => key.includes('strIngredient'));

      setRecipe({
        image: APIRecipeByID.strDrinkThumb,
        name: APIRecipeByID.strDrink,
        category: APIRecipeByID.strCategory,
        ingredients: ingredients
          .map((ingredient) => (APIRecipeByID[ingredient] !== null
&& APIRecipeByID[ingredient])),
        preparation: APIRecipeByID.strInstructions,
        nationality: '',
        alcoholicOrNot: APIRecipeByID.strAlcoholic,
      });
    };
    const getLocalStorage = () => {
      const currentLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const validate = currentLocalStorage ? currentLocalStorage.cocktails[id] : [];
      setSaveLocalStorage(validate);
    };
    AllRecipeDrink();
    getLocalStorage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InProgress
      id={ id }
      page="drink"
      recipe={ recipe }
      saveLocal={ saveLocalStorage }
    />

  );
}

export default DrinkInProgress;
