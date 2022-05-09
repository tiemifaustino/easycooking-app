import React from 'react';
import Header from '../components/Header';
import DoneRecipesCard from '../components/DoneRecipesCard';

function DoneRecipes() {
  return (
    <>
      <Header title="Done Recipes" visible={ false } />
      <button
        data-testid="filter-by-all-btn"
        type="button"
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
      >
        Driks
      </button>
      <DoneRecipesCard />

    </>

  );
}

export default DoneRecipes;
