import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrinks() {
  const history = useHistory();

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
      >
        Surprise me!
      </button>
      <Footer />
    </>
  );
}

export default ExploreDrinks;
