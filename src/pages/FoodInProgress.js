import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InProgress from '../components/InProgress';
import { fetchRecipeByID } from '../services/API';

function FoodInProgress() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState();
  const [saveLocalStorage, setSaveLocalStorage] = useState({ cocktails: {}, meals: {} });

  useEffect(() => {
    const AllRecipeFood = async () => {
      const fetchAPI = await fetchRecipeByID(id);
      const APIRecipeByID = fetchAPI.meals[0];
      const ingredients = Object
        .keys(APIRecipeByID).filter((key) => key.includes('strIngredient'));

      setRecipe({
        id: APIRecipeByID.idMeal,
        type: 'food',
        image: APIRecipeByID.strMealThumb,
        name: APIRecipeByID.strMeal,
        category: APIRecipeByID.strCategory,
        ingredients: ingredients
          .map((ingredient) => (APIRecipeByID[ingredient] !== null
&& APIRecipeByID[ingredient])),
        preparation: APIRecipeByID.strInstructions,
        nationality: APIRecipeByID.strArea,
        alcoholicOrNot: '',
        tags: APIRecipeByID.strTags,
      });
    };
    const getLocalStorage = () => {
      const currentLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const validate = currentLocalStorage ? currentLocalStorage.meals[id] : [];
      setSaveLocalStorage(validate);
    };
    AllRecipeFood();
    getLocalStorage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <InProgress
        id={ id }
        page="food"
        recipe={ recipe }
        saveLocal={ saveLocalStorage }
      />
    </div>

  );
}

export default FoodInProgress;
