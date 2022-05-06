import PropTypes from 'prop-types';
import React from 'react';
// import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FavoriteBtnHorizontal from './FavoriteBtnHorizontal';
import shareBtnLogo from '../images/shareIcon.svg';

function FavoriteCards({ index, title, img, category, nationality }) {
  const favoriteLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const handleShare = () => {
    toast.success('Link copied!');
    const textToCopy = window.location.href.replace('/in-progress', '');
    navigator.clipboard.writeText(textToCopy);
  };

  // const checkIfIsFavorite = () => {
  //   const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //   const isRecipeFavorite = favoriteRecipes?.some(
  //     (favoriteRecipe) => favoriteRecipe.id === id,
  //   );
  //   setIsFavorite(isRecipeFavorite);
  // };

  // const handleFavorite = () => {
  //   const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //   console.log(favoriteRecipes);
  //   if (favoriteRecipes.some(
  //     (favoriteRecipe) => favoriteRecipe.id === id,
  //   )) {
  //     console.log('entrou if favoritecards');
  //     const favoritesRemoved = favoriteRecipes.filter((favRecipe) => favRecipe.id !== id);
  //     const favoritesString = JSON.stringify(favoritesRemoved);
  //     setIsFavorite(!isFavorite);
  //     localStorage.setItem('favoriteRecipes', favoritesString);
  //   }
  // };

  return (
    <div>
      <img
        data-testid={ `${index}-horizontal-image` }
        alt={ title }
        src={ img }
      />
      <p data-testid={ `${index}-horizontal-name` }>
        { title }
      </p>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {`${nationality} - ${category}`}
      </p>
      <p data-testid={ `${index}-horizontal-done-date` } />

      <input
        type="image"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ handleShare }
        src={ shareBtnLogo }
        alt="Share button"
      />
      <FavoriteBtnHorizontal
        index={ index }
        id={ favoriteLocalStorage[index].id }
        type={ favoriteLocalStorage[index].type }
        nationality={ favoriteLocalStorage[index].nationality }
        category={ favoriteLocalStorage[index].category }
        name={ favoriteLocalStorage[index].name }
        image={ favoriteLocalStorage[index].image }
        alcoholicOrNot={ favoriteLocalStorage[index].alcoholicOrNot }
      />
    </div>
  );
}

FavoriteCards.propTypes = {
  index: PropTypes.number,
  img: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default FavoriteCards;
