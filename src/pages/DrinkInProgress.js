import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { requestCocktailByIDThunk, recipeThunk } from '../actions/index.actions';
import shareBtnLogo from '../images/shareIcon.svg';
import favoriteNotChecked from '../images/whiteHeartIcon.svg';
import favoriteChecked from '../images/blackHeartIcon.svg';

function DrinkInProgress() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { cocktail } = useSelector((state) => state.cocktailByIDReducer);
  const [ingredients, setIngredients] = useState([]);
  const [drink, setDrink] = useState([]);
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
    dispatch(recipeThunk({ search: '', typeInput: 'Name' }));
    dispatch(requestCocktailByIDThunk(id));
    checkIfIsFavorite();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // this hook makes the API output easier to read by returning the ingredients in the following format:
    // ingredients = ['Southern Comfort', 'Triple sec', 'Lime', 'Sour mix']
    setDrink(cocktail);
    if (cocktail.length > 0) {
      const drinkIngredients = Object.entries(cocktail[0])
        .filter((drinkIngredient) => drinkIngredient[0].includes('strIngredient'))
        .filter((drinksArray) => drinksArray[1] !== ''
        && drinksArray[1] !== null)
        .map((ingredientBeingMapped) => ingredientBeingMapped[1]);

      const drinkMeasurements = Object.entries(cocktail[0])
        .filter((drinkMeasurement) => drinkMeasurement[0].includes('strMeasure'))
        .filter((drinksArray) => drinksArray[1] !== ''
        && drinksArray[1] !== null)
        .map((measurementsMapped) => measurementsMapped[1]);

      setIngredients(drinkIngredients);
      setMeasurements(drinkMeasurements);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cocktail]);

  const handleClick = () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const currentRecipe = {
      id: cocktail[0].idDrink,
      type: 'drink',
      nationality: '',
      category: cocktail[0].strCategory,
      alcoholicOrNot: cocktail[0].strAlcoholic,
      name: cocktail[0].strDrink,
      image: cocktail[0].strDrinkThumb,
      doneDate: today.toDateString(),
      tags: cocktail[0].strTags,
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
    const cocktailURL = window.location.href.replace('/in-progress', '');
    navigator.clipboard.writeText(cocktailURL);
  };

  const handleFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (isFavorite) {
      const filteredFavorites = favoriteRecipes
        .filter((favoriteRecipe) => favoriteRecipe.id !== id);
      const favoritesString = JSON.stringify(filteredFavorites);
      localStorage.setItem('favoriteRecipes', favoritesString);
    } else {
      const favoriteRecipeToAdd = {
        id,
        type: 'drink',
        nationality: '',
        category: cocktail[0].strCategory,
        alcoholicOrNot: cocktail[0].strAlcoholic,
        name: cocktail[0].strDrink,
        image: cocktail[0].strDrinkThumb,

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
    drink.length > 0
      ? (
        <div>
          <img
            src={ cocktail[0].strDrinkThumb }
            alt="cocktail thumbnail"
            data-testid="recipe-photo"
          />
          <div>
            <h2 data-testid="recipe-title">{cocktail[0].strDrink}</h2>
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
            <p data-testid="recipe-category">{cocktail[0].strAlcoholic}</p>
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
                  {(`${ingredient} ${measurements[index]}`).replace('undefined', '')}
                </label>
              </div>
            ))}
            <h2>Instructions</h2>
            <p data-testid="instructions">{cocktail[0].strInstructions}</p>
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

export default DrinkInProgress;
