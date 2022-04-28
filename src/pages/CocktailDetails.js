import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { requestCocktailByIDThunk } from '../actions/index.actions';

function CocktailDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { cocktail } = useSelector((state) => state.cocktailByIDReducer);
  const [ingredients, setIngredients] = useState([]);
  const [drink, setDrink] = useState([]);
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    dispatch(requestCocktailByIDThunk(id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // this hook makes the API output easier to read by returning the ingredients in the following format:
    // ingredients = ['Southern Comfort', 'Triple sec', 'Lime', 'Sour mix']
    setDrink(cocktail);
    if (cocktail.length > 0) {
      const drinkIngredients = Object.entries(cocktail[0])
        .filter((drinkIngredient) => drinkIngredient[0].includes('strIngredient'))
        .filter((drinksArray) => drinksArray[1] !== null)
        .map((ingredientBeingMapped) => ingredientBeingMapped[1]);

      const drinkMeasurements = Object.entries(cocktail[0])
        .filter((drinkMeasurement) => drinkMeasurement[0].includes('strMeasure'))
        .filter((drinksArray) => drinksArray[1] !== null)
        .map((measurementsMapped) => measurementsMapped[1]);

      setIngredients(drinkIngredients);
      setMeasurements(drinkMeasurements);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cocktail]);
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
            <button type="button" data-testid="share-btn">Share Btn</button>
            <button type="button" data-testid="favorite-btn">Favoritar</button>
            <p data-testid="recipe-category">{cocktail[0].strAlcoholic}</p>
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
            <p data-testid="instructions">
              {cocktail[0].strInstructions}
            </p>
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

export default CocktailDetails;
