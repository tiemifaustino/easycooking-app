import React from 'react';
import Header from '../components/Header';
import FavoriteCards from '../components/FavoriteCards';

function FavoriteRecipes() {
  const favoriteLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.log(favoriteLocalStorage);

  return (
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
      {
        favoriteLocalStorage && favoriteLocalStorage
          .map((favorite, index) => (
            <FavoriteCards
              id={ favorite.id }
              key={ favorite.id }
              index={ index }
              title={ favorite.name }
              img={ favorite.image }
              category={ favorite.category }
              nationality={ favorite.nationality }
            />
          ))
      }

    </>

  );
}

export default FavoriteRecipes;
