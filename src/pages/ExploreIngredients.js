import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { requestIngredientsListThunk } from '../actions/index.actions';

function ExploreIngredients() {
  const { ingredients } = useSelector((state) => state.ingredientsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestIngredientsListThunk());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header title="Explore Ingredients" visible={ false } />
      {
        ingredients && ingredients.map((ingredient, index) => {
          const maxIngredients = 11;
          if (index > maxIngredients) return;
          return (
            <div
              data-testid={ `${index}-ingredient-card` }
              key={ ingredient.idIngredient }
            >
              <img
                data-testid={ `${index}-card-img` }
                src=""
                alt={ ingredient.strIngredient }
              />
              <p data-testid={ `${index}-card-name` }>{ ingredient.strIngredient }</p>
            </div>
          );
        })
      }
      <Footer />
    </>
  );
}

export default ExploreIngredients;
