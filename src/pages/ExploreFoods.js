import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { requestRecipeSupriseThunk } from '../actions/index.actions';

function ExploreFoods() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { recipeSuprise } = useSelector((state) => state.recipeSupriseReducer);

  useEffect(() => {
    dispatch(requestRecipeSupriseThunk());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickSuprise = () => {
    dispatch(requestRecipeSupriseThunk());
    const { idMeal } = recipeSuprise.meals[0];
    history.push(`/foods/${idMeal}`);
  };

  return (
    <>
      <Header title="Explore Foods" visible={ false } />

      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => history.push('/explore/foods/ingredients') }
      >
        By Ingredient
      </button>

      <button
        data-testid="explore-by-nationality"
        type="button"
        onClick={ () => history.push('/explore/foods/nationalities') }
      >
        By Nationality
      </button>

      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ handleClickSuprise }
      >
        Surprise me!
      </button>

      <Footer />
    </>
  );
}

export default ExploreFoods;
