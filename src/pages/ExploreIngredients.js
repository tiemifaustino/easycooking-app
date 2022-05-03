import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { requestIngredientsListThunk } from '../actions/index.actions';
import CardIngredients from '../components/CardIngredients';

function ExploreIngredients() {
  const { ingredients } = useSelector((state) => state.ingredientsReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(requestIngredientsListThunk());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { location: { pathname } } = history;
  console.log(pathname);
  return (
    <>
      <Header title="Explore Ingredients" visible={ false } />
      {
        pathname === '/explore/foods/ingredients'
        && ingredients && ingredients.map((ingredient, index) => {
          const maxIngredients = 11;
          if (index > maxIngredients) return;
          return (
            <CardIngredients
              key={ ingredient.idIngredient }
              index={ index }
              img={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
              title={ ingredient.strIngredient }
            />
          );
        })
      }
      <Footer />
    </>
  );
}

export default ExploreIngredients;
