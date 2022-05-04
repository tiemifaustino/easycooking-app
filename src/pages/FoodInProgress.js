import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { requestRecipeByIDThunk, cocktailThunk } from '../actions/index.actions';
import InProgress from '../components/InProgress';

function FoodInProgress() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { recipe } = useSelector((state) => state.recipeByIDReducer);
  const [ingredients, setIngredients] = useState([]);
  const [meal, setMeal] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [numberOfSteps, setNumberOfSteps] = useState(0);

  const checkIfIsFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isRecipeFavorite = favoriteRecipes?.some(
      (favoriteRecipe) => favoriteRecipe.id === id,
    );
    setIsFavorite(isRecipeFavorite);
  };

  useEffect(() => {
    dispatch(cocktailThunk({ search: '', typeInput: 'Name' }));
    dispatch(requestRecipeByIDThunk(id));
    checkIfIsFavorite();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // this hook makes the API output easier to read by returning the ingredients in the following format:
    // ingredients = ['White Flour', 'Salt', 'Yeast', 'Milk', 'Butter']
    setMeal(recipe);
    if (recipe.length > 0) {
      const mealIngredients = Object.entries(recipe[0])
        .filter((mealIngredient) => mealIngredient[0].includes('strIngredient'))
        .filter((ingredientsArray) => ingredientsArray[1] !== ''
        && ingredientsArray[1] !== null)
        .map((ingredientBeingMapped) => ingredientBeingMapped[1]);

      const mealMeasurements = Object.entries(recipe[0])
        .filter((mealMeasurement) => mealMeasurement[0].includes('strMeasure'))
        .filter((measurementsArray) => measurementsArray[1] !== ''
        && measurementsArray[1] !== null)
        .map((measurementsMapped) => measurementsMapped[1]);

      setIngredients(mealIngredients);
      setMeasurements(mealMeasurements);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe]);

  return (
    <InProgress
      id={ id }
      page="food"
      // saveStorage={ }
      ingredients={ ingredients }
      measurements={ measurements }
    />
  );
}

export default FoodInProgress;
