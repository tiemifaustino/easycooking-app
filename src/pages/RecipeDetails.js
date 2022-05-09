import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'react-bootstrap/Image';
import { Button } from 'react-bootstrap';
import { requestRecipeByIDThunk, cocktailThunk } from '../actions/index.actions';
import SimpleSliderDrinks from '../components/SimpleSliderDrinks';
import ShareBtn from '../components/ShareBtn';
import FavoriteBtn from '../components/FavoriteBtn';

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

  const findButtonInLocalStorage = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const isRecipeDone = doneRecipes?.some((doneRecipe) => doneRecipe.id === Number(id));
    setShowBtn(!isRecipeDone);
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipesInProgress?.meals[id] !== undefined) setCurrentBtn('Continue Recipe');
  };

  useEffect(() => {
    dispatch(cocktailThunk({ search: '', typeInput: 'Name' }));
    dispatch(requestRecipeByIDThunk(id));
    findButtonInLocalStorage();
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
    // const sortRandomize = 0.5;
    const MAXIMUN_NUMBER_OF_CARDS = 6;
    if (cocktail.drinks?.length > 0) {
      const randomCards = [...cocktail.drinks];
      // .sort(() => Math.random() - sortRandomize);
      setRecommendedCards(randomCards.slice(0, MAXIMUN_NUMBER_OF_CARDS));
    }
  }, [cocktail]);

  const handleClick = () => {
    history.push(`/foods/${id}/in-progress`);
  };

  return (

    meal.length > 0
      ? (
        <>
          <Image
            src={ meal[0].strMealThumb }
            alt="recipe thumbnail"
            data-testid="recipe-photo"
            className="img-fluid"
          />

          <div
            className="name-recipe d-flex justify-content-between
                  align-items-center pt-2 px-3"
          >
            <div>
              <h2 data-testid="recipe-title">{meal[0].strMeal}</h2>
              <p data-testid="recipe-category">{meal[0].strCategory}</p>
            </div>

            <div className="d-flex align-items-center ">
              <div className="container-icons mx-1">
                <ShareBtn />
              </div>
              <div className="container-icons mx-1">
                <FavoriteBtn
                  id={ id }
                  type="food"
                  nationality={ meal[0].strArea }
                  category={ meal[0].strCategory }
                  name={ meal[0].strMeal }
                  image={ meal[0].strMealThumb }
                  alcoholicOrNot=""
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="title px-3 m-3">Ingredients</h2>
            <ul className="mx-4 px-5 py-4 container-details">
              { ingredients.map((ingredient, index) => (
                <li
                  key={ `${index}-ingredient-name-and-measure` }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${ingredient} ${measurements[index]}`}

                </li>
              )) }
            </ul>

            <h2 className="title-h2-page-details  px-3 m-3">Instructions</h2>
            <p
              data-testid="instructions"
              className="container-details mx-4 p-3"
            >
              {meal[0].strInstructions}

            </p>

            <h2 className="title-h2-page-details  px-3 m-3">Video</h2>
            <iframe
              width="420"
              height="315"
              data-testid="video"
              src={ meal[0].strYoutube.replace('watch?v=', 'embed/') }
              title="video da receita"
              className="video-details m-3 p-2 d-flex justify-content-center"
            />
          </div>

          <h2 className="title-h2-page-details  px-3 m-3">Recommended</h2>
          <SimpleSliderDrinks
            recommendedCards={ recommendedCards }
          />

          <footer className="d-flex justify-content-center footer-button">
            {
              showBtn
                ? (
                  <Button
                    className="recipe-button my-2"
                    type="button"
                    data-testid="start-recipe-btn"
                    onClick={ () => handleClick() }
                    size="lg"
                    variant="danger"
                  >
                    {currentBtn}
                  </Button>)
                : ''
            }
          </footer>
        </>
      )
      : ''
  );
}

export default RecipeDetails;
