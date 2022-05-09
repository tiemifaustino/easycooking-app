import React from 'react';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import FavoriteCards from '../components/FavoriteCards';

function FavoriteRecipes() {
  const favoriteLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
  console.log(favoriteLocalStorage);

  return (
    <div className="container-cards container-page">
      <Header title="Favorite Recipes" visible={ false } />

      <div className="d-flex justify-content-center mt-3 mb-4">
        <div className="container-buttons d-flex justify-content-center m-0">
          <Button
            data-testid="filter-by-all-btn"
            type="button"
            variant="dark"
            size="md"
            className="mx-2 px-4"
          >
            All
          </Button>
          <Button
            data-testid="filter-by-food-btn"
            type="button"
            variant="dark"
            size="md"
            className="mx-2 px-4"
          >
            Food
          </Button>
          <Button
            data-testid="filter-by-drink-btn"
            type="button"
            variant="dark"
            size="md"
            className="mx-2 px-4"
          >
            Drinks
          </Button>
        </div>
      </div>
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
    </div>

  );
}

export default FavoriteRecipes;
