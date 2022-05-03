import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { requestIngredientsListThunk,
  requestIngredientsDrinksThunk } from '../actions/index.actions';
import CardIngredients from '../components/CardIngredients';

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

  return (
    <>
      <Header title="Explore Ingredients" visible={ false } />
      {
        pathname === '/explore/foods/ingredients'
        && ingredients && ingredients.map((ingredient, index) => {
          const maxIngredients = 11;
          if (index > maxIngredients) return;
          return (
            <Link
              to="/foods"
              key={ ingredient.idIngredient }
            >
              <CardIngredients
                key={ ingredient.idIngredient }
                index={ index }
                img={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
                title={ ingredient.strIngredient }
              />
            </Link>
          );
        })
      }
      {
        pathname === '/explore/drinks/ingredients'
        && drinksIngredients && drinksIngredients.map((drinkIngredient, index) => {
          const maxIngredients = 11;
          if (index > maxIngredients) return;
          return (
            <CardIngredients
              key={ index }
              index={ index }
              img={ `https://www.thecocktaildb.com/images/ingredients/${drinkIngredient.strIngredient1}-Small.png` }
              title={ drinkIngredient.strIngredient1 }
            />
          );
        })
      }
      <Footer />
    </>
  );
}

export default ExploreIngredients;
