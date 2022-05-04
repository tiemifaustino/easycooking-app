import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import shareBtnLogo from '../images/shareIcon.svg';
import favoriteNotChecked from '../images/whiteHeartIcon.svg';
import favoriteChecked from '../images/blackHeartIcon.svg';

function FavoriteCards({ index, title, img, category, nationality }) {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [goneButtons, setGoneButtons] = useState(false);
  const handleShare = () => {
    toast.success('Link copied!');
    navigator.clipboard.writeText(window.location.href);
  };

  const handleFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (!isFavorite) {
      const filteredFavorites = favoriteRecipes
        .filter((favoriteRecipe) => favoriteRecipe.id !== id);
      const favoritesString = JSON.stringify(filteredFavorites);
      localStorage.setItem('favoriteRecipes', favoritesString);
    } else {
      // const favoriteRecipeToAdd = {
      //   id,
      //   type: '',
      //   nationality: '',
      //   category: '',
      //   alcoholicOrNot: '',
      //   name: '',
      //   image: '',

      // };
      // const favoritesString = JSON
      //   .stringify([favoriteRecipeToAdd]);
      // localStorage.setItem('favoriteRecipes', favoritesString);
    }
    setGoneButtons(!goneButtons);
    setIsFavorite(!isFavorite);
  };

  const checkIfIsFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isRecipeFavorite = favoriteRecipes?.some(
      (favoriteRecipe) => favoriteRecipe.id === id,
    );
    setIsFavorite(!isRecipeFavorite);
  };

  useEffect(() => {
    checkIfIsFavorite();
  }, []);

  useEffect(() => {

  }, [goneButtons]);

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
      {
        goneButtons ? '' : (
          <input
            type="image"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ handleShare }
            src={ shareBtnLogo }
            alt="Share button"
          />
        )
      }

      {!goneButtons
       && (
         isFavorite
           ? (
             <input
               type="image"
               data-testid={ `${index}-horizontal-favorite-btn"` }
               alt="Favorite button"
               onClick={ handleFavorite }
               src={ favoriteChecked }
             />)
           : (
             <input
               type="image"
               data-testid={ `${index}-horizontal-favorite-btn"` }
               alt="Favorite button"
               onClick={ handleFavorite }
               src={ favoriteNotChecked }
             />))}
    </div>
  );
}

FavoriteCards.propTypes = {
  index: PropTypes.number,
  img: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default FavoriteCards;
