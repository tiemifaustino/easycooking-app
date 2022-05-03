import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { requestRecipeByIDThunk } from '../actions/index.actions';

function RecipeDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { recipe } = useSelector((state) => state.recipeByIDReducer);
  const [ingredients, setIngredients] = useState([]);
  const [meal, setMeal] = useState([]);
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    dispatch(requestRecipeByIDThunk(id));
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
            <button type="button" data-testid="share-btn">Share Btn</button>
            <button type="button" data-testid="favorite-btn">Favoritar</button>
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
          <div>
            <h2>Recommended</h2>
            <ul>
              <li data-testid={ `${0}-recomendation-card` } />
              <li data-testid={ `${1}-recomendation-card` } />
            </ul>
          </div>
          <button type="button" data-testid="start-recipe-btn">Start Recipe</button>
        </div>
      ) : '');
}

export default RecipeDetails;
