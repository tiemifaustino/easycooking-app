import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { requestRecipeByIDThunk, cocktailThunk } from '../actions/index.actions';
import SimpleSliderDrinks from '../components/SimpleSliderDrinks';
import shareBtnLogo from '../images/shareIcon.svg';
import favoriteNotChecked from '../images/whiteHeartIcon.svg';
import favoriteChecked from '../images/blackHeartIcon.svg';

function RecipeDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { recipe } = useSelector((state) => state.recipeByIDReducer);
  const { cocktail } = useSelector((state) => state.cocktailReducer);
  const [ingredients, setIngredients] = useState([]);
  const [meal, setMeal] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [recommendedCards, setRecommendedCards] = useState([]);
  const [currentBtn, setCurrentBtn] = useState('Start Recipe');
  const [showBtn, setShowBtn] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const findButtonInLocalStorage = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const isRecipeDone = doneRecipes?.some((doneRecipe) => doneRecipe.id === Number(id));
    setShowBtn(!isRecipeDone);
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipesInProgress?.meals[id] !== undefined) setCurrentBtn('Continue Recipe');
  };

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
    findButtonInLocalStorage();
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
        .filter((ingredientsArray) => ingredientsArray[1] !== '')
        .map((ingredientBeingMapped) => ingredientBeingMapped[1]);

      const mealMeasurements = Object.entries(recipe[0])
        .filter((mealMeasurement) => mealMeasurement[0].includes('strMeasure'))
        .filter((measurementsArray) => measurementsArray[1] !== '')
        .map((measurementsMapped) => measurementsMapped[1]);

      setIngredients(mealIngredients);
      setMeasurements(mealMeasurements);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe]);

  useEffect(() => {
    // const sortRandomizer = 0.5;
    const MAXIMUN_NUMBER_OF_CARDS = 6;
    if (cocktail.drinks?.length > 0) {
      const randomCards = [...cocktail.drinks];
      // .sort(() => Math.random() - sortRandomizer);
      setRecommendedCards(randomCards.slice(0, MAXIMUN_NUMBER_OF_CARDS));
    }
  }, [cocktail]);

  const handleClick = () => {
    history.push(`/foods/${id}/in-progress`);
  };

  const handleShare = () => {
    toast.success('Link copied!');
    navigator.clipboard.writeText(window.location.href);
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
            <ul>
              <h2>Ingredients</h2>
              {ingredients.map((ingredient, index) => (
                <li
                  key={ `${index}-ingredient-name-and-measure` }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${ingredient} ${measurements[index]}`}

                </li>
              ))}
            </ul>
            <h2>Instructions</h2>
            <p data-testid="instructions">{meal[0].strInstructions}</p>
            <h2>Video</h2>
            <iframe
              width="420"
              height="315"
              data-testid="video"
              src={ meal[0].strYoutube.replace('watch?v=', 'embed/') }
              title="video da receita"
            />
          </div>
          <h2>Recommended</h2>
          <SimpleSliderDrinks
            recommendedCards={ recommendedCards }
          />
          {showBtn
            ? (
              <button
                className="recipe-button"
                type="button"
                data-testid="start-recipe-btn"
                onClick={ () => handleClick() }
              >
                {currentBtn}
              </button>)
            : ''}

        </div>
      ) : '');
}

export default RecipeDetails;
