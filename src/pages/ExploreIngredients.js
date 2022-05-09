import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { requestIngredientsListThunk,
  requestIngredientsDrinksThunk, ingredientFilter } from '../actions/index.actions';
import CardIngredients from '../components/CardIngredients';
import './ExploreIngredients.css';

function ExploreIngredients() {
  const { ingredients,
    drinksIngredients } = useSelector((state) => state.ingredientsReducer);
  const dispatch = useDispatch();
  const history = useHistory();
  const { location: { pathname } } = history;

  useEffect(() => {
    dispatch(requestIngredientsListThunk());
    dispatch(requestIngredientsDrinksThunk());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickMeals = (ingredientValue) => {
    dispatch(ingredientFilter(ingredientValue));
    history.push('/foods');
  };

  const handleClickDrinks = (ingredientValue) => {
    dispatch(ingredientFilter(ingredientValue));
    history.push('/drinks');
  };

  return (
    <div className="container-page-ingredients">
      <Header title="Explore Ingredients" visible={ false } />

      <div className="d-flex flex-wrap justify-content-center mx-2 mt-3 container-cards">
        {
          pathname === '/explore/foods/ingredients'
        && ingredients && ingredients.map((ingredient, index) => {
            const maxIngredients = 11;
            if (index > maxIngredients) return;
            return (
              <Card
                onClick={ () => handleClickMeals(ingredient.strIngredient) }
                key={ ingredient.idIngredient }
                type="button"
                style={ { width: '9.2rem', height: '15rem' } }
                className="m-2"
              >
                <CardIngredients
                  index={ index }
                  img={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
                  title={ ingredient.strIngredient }
                />
              </Card>
            );
          })
        }
        {
          pathname === '/explore/drinks/ingredients'
        && drinksIngredients && drinksIngredients.map((drinkIngredient, index) => {
            const maxIngredients = 11;
            if (index > maxIngredients) return;
            return (
              <Card
                onClick={ () => handleClickDrinks(drinkIngredient.strIngredient1) }
                key={ index }
                type="button"
                style={ { width: '9.2rem', height: '15rem' } }
                className="m-2"
              >
                <CardIngredients
                  index={ index }
                  img={ `https://www.thecocktaildb.com/images/ingredients/${drinkIngredient.strIngredient1}-Small.png` }
                  title={ drinkIngredient.strIngredient1 }
                />
              </Card>
            );
          })
        }
      </div>

      <Footer />
    </div>
  );
}

export default ExploreIngredients;
