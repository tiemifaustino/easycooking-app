import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFoods() {
  const history = useHistory();

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
      >
        Surprise me!
      </button>

      <Footer />
    </>
  );
}

export default ExploreFoods;
