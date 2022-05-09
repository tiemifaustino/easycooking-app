import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import FavoriteCards from '../components/FavoriteCards';

function FavoriteRecipes() {
  const { favoriteRecipes } = useSelector((state) => state.favoriteReducer);
  const [filter, setFilter] = React.useState('');

  return (
    <>
      <Header title="Favorite Recipes" visible={ false } />
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => setFilter('') }
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ () => setFilter('food') }
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => setFilter('drink') }
      >
        Drinks
      </button>
      {
        favoriteRecipes?.filter((item) => item.type.includes(filter))
          .map((favorite, index) => (
            <FavoriteCards
              id={ favorite.id }
              key={ favorite.id }
              index={ index }
              name={ favorite.name }
              type={ favorite.type }
              img={ favorite.image }
              category={ favorite.category }
              nationality={ favorite.nationality }
              alcoholic={ favorite.alcoholicOrNot }
            />
          ))
      }
    </>

  );
}

export default FavoriteRecipes;
