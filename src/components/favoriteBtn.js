import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import favoriteChecked from '../images/blackHeartIcon.svg';
import favoriteNotChecked from '../images/whiteHeartIcon.svg';

function FavoriteBtn({ id, type, nationality, category, name, image, alcoholicOrNot }) {
  const [isFavorite, setIsFavorite] = useState();

  const checkIfIsFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isRecipeFavorite = favoriteRecipes?.some(
      (favoriteRecipe) => favoriteRecipe.id === id,
    );
    setIsFavorite(isRecipeFavorite);
  };

  useEffect(() => {
    checkIfIsFavorite();
  });

  const handleFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteRecipeToAdd = {
      id,
      type,
      nationality,
      category,
      alcoholicOrNot,
      name,
      image,
    };
    let favoritesString = JSON.stringify([favoriteRecipeToAdd]);
    if (favoriteRecipes === null) {
      localStorage.setItem('favoriteRecipes', favoritesString);
      setIsFavorite(isFavorite);
    } else if (favoriteRecipes.some(
      (favoriteRecipe) => favoriteRecipe.id === id,
    )) {
      const favoritesRemoved = favoriteRecipes.filter((favRecipe) => favRecipe.id !== id);
      favoritesString = JSON.stringify(favoritesRemoved);
      setIsFavorite(!isFavorite);
    } else {
      favoritesString = JSON.stringify([...favoriteRecipes, favoriteRecipeToAdd]);
      setIsFavorite(isFavorite);
    }
    localStorage.setItem('favoriteRecipes', favoritesString);
    checkIfIsFavorite();
  };

  return (
    <button
      type="button"
      onClick={ handleFavorite }
    >
      <img
        src={ isFavorite ? favoriteChecked : favoriteNotChecked }
        alt="favorite"
        data-testid="favorite-btn"
      />
    </button>
  );
}

FavoriteBtn.propTypes = {
  id: PropTypes.string,
  page: PropTypes.string,
}.isRequired;

export default FavoriteBtn;