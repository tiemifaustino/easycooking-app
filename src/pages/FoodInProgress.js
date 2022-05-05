import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InProgress from '../components/InProgress';
import { fetchRecipeByID } from '../services/API';

function FoodInProgress() {
  const { id } = useParams();
  const [meal, setMeal] = useState();
  const [saveLocalStorage, setSaveLocalStorage] = useState({ cocktails: {}, meals: {} });

  useEffect(() => {
    const AllRecipeFood = async () => {
      const fetchAPI = await fetchRecipeByID(id);
      const APIRecipeByID = fetchAPI.meals[0];
      const ingredients = Object
        .keys(APIRecipeByID).filter((key) => key.includes('strIngredient'));

      setMeal({
        image: APIRecipeByID.strMealThumb,
        name: APIRecipeByID.strMeal,
        category: APIRecipeByID.strCategory,
        ingredients: ingredients
          .map((ingredient) => (APIRecipeByID[ingredient] !== null
              && APIRecipeByID[ingredient])),
        preparation: APIRecipeByID.strInstructions,
      });
    };
    const getLocalStorage = () => {
      const currentLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const validate = currentLocalStorage ? currentLocalStorage.meals[id] : [];
      setSaveLocalStorage(validate);
    };
    AllRecipeFood();
    getLocalStorage();
  }, []);

  return (
    <InProgress
      id={ id }
      page="food"
      meal={ meal }
      saveLocal={ saveLocalStorage }
    />

  );
}

export default FoodInProgress;
