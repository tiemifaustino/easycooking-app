import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { requestRecipeByIDThunk, cocktailThunk } from '../actions/index.actions';
import shareBtnLogo from '../images/shareIcon.svg';
import favoriteNotChecked from '../images/whiteHeartIcon.svg';
import favoriteChecked from '../images/blackHeartIcon.svg';

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

  const handleClick = () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const currentRecipe = {
      id: meal[0].idMeal,
      type: 'food',
      nationality: meal[0].strArea,
      category: meal[0].strCategory,
      alcoholicOrNot: '',
      name: meal[0].strMeal,
      image: meal[0].strMealThumb,
      doneDate: today.toDateString(),
      tags: meal[0].strTags,
    };

    if (!doneRecipes) {
      const doneRecipeString = JSON.stringify([currentRecipe]);
      localStorage.setItem('doneRecipes', doneRecipeString);
    } else {
      const doneRecipeString = JSON.stringify([...doneRecipes, currentRecipe]);
      localStorage.setItem('doneRecipes', doneRecipeString);
    }

    history.push('/done-recipes');
  };

  const handleShare = () => {
    toast.success('Link copied!');
    const recipeURL = window.location.href.replace('/in-progress', '');
    navigator.clipboard.writeText(recipeURL);
  };

  const handleFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (isFavorite) {
      const filteredFavorites = favoriteRecipes
        .filter((favoriteRecipe) => favoriteRecipe.id !== id);
      const favoritesString = JSON.stringify(filteredFavorites);
      localStorage.setItem('favoriteRecipes', favoritesString);
    } else {
      console.log(recipe, meal);
      const favoriteRecipeToAdd = {
        id,
        type: 'food',
        nationality: recipe[0].strArea,
        category: recipe[0].strCategory,
        alcoholicOrNot: '',
        name: recipe[0].strMeal,
        image: recipe[0].strMealThumb,

      };
      const favoritesString = JSON
        .stringify([favoriteRecipeToAdd]);
      localStorage.setItem('favoriteRecipes', favoritesString);
    }

    setIsFavorite(!isFavorite);
  };

  const handleChecked = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    setNumberOfSteps(document.querySelectorAll('input[name=chkBox]:checked').length);
  }, [isChecked]);

  return (
    meal.length > 0
      ? (
        <div>
          <img
            src={ meal[0].strMealThumb }
            alt="recipe thumbnail"
            data-testid="recipe-photo"
          />
          <div>
            <h2 data-testid="recipe-title">{meal[0].strMeal}</h2>
            <input
              type="image"
              data-testid="share-btn"
              onClick={ handleShare }
              src={ shareBtnLogo }
              alt="Share button"
            />
            {isFavorite
              ? (
                <input
                  type="image"
                  data-testid="favorite-btn"
                  alt="Favorite button"
                  src={ favoriteChecked }
                  onClick={ handleFavorite }
                />)
              : (
                <input
                  type="image"
                  data-testid="favorite-btn"
                  alt="Favorite button"
                  src={ favoriteNotChecked }
                  onClick={ handleFavorite }
                />) }
            <p data-testid="recipe-category">{meal[0].strCategory}</p>
          </div>

          <div>
            <h2>Ingredients</h2>
            {ingredients.map((ingredient, index) => (
              <div
                key={ `${index}-ingredient-name-and-measure` }
                data-testid={ `${index}-ingredient-step` }
              >
                <label
                  htmlFor={ `${index}-ingredient-step` }
                >
                  <input
                    type="checkbox"
                    id={ `${index}-ingredient-step` }
                    name="chkBox"
                    onChange={ handleChecked }
                  />
                  {`${ingredient} ${measurements[index]}`}
                </label>
              </div>
            ))}
            <h2>Instructions</h2>
            <p data-testid="instructions">{meal[0].strInstructions}</p>
            <h2>Video</h2>
            {/* <iframe
              width="420"
              height="315"
              data-testid="video"
              src={ meal[0].strYoutube.replace('watch?v=', 'embed/') }
              title="video da receita"
            /> */}
          </div>

          <button
            className="recipe-button"
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ numberOfSteps !== ingredients.length }
            onClick={ () => handleClick() }
          >
            Finish Recipe
          </button>

        </div>
      ) : '');
}

export default FoodInProgress;
