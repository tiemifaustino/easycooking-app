import React from 'react';
import Header from '../components/Header';
import FavoriteCards from '../components/FavoriteCards';

const FavoriteRecipes = () => (
  <>
    <Header title="Favorite Recipes" visible={ false } />
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
    <FavoriteCards />
  </>

);

export default FavoriteRecipes;
