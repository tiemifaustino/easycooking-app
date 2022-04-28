import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { requestCocktailSupriseThunk } from '../actions/index.actions';

function ExploreDrinks() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { cocktailSuprise } = useSelector((state) => state.cocktailSupriseReducer);

  useEffect(() => {
    dispatch(requestCocktailSupriseThunk());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickSuprise = () => {
    const { idDrink } = cocktailSuprise.drinks[0];
    history.push(`/drinks/${idDrink}`);
  };

  return (
    <>
      <Header title="Explore Drinks" visible={ false } />
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => history.push('/explore/drinks/ingredients') }
      >
        By Ingredient
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

export default ExploreDrinks;
