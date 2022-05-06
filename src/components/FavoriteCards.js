import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import favoriteChecked from '../images/blackHeartIcon.svg';
import shareBtnLogo from '../images/shareIcon.svg';

function FavoriteCards({ index, title, img, category, nationality, id }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { recipe } = useSelector((state) => state.recipeByIDReducer);
  const { cocktail } = useSelector((state) => state.cocktailReducer);
  const handleShare = () => {
    toast.success('Link copied!');
    navigator.clipboard.writeText(window.location.href);
  };

  const checkIfIsFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isRecipeFavorite = favoriteRecipes?.some(
      (favoriteRecipe) => favoriteRecipe.id === id,
    );
    setIsFavorite(isRecipeFavorite);
  };

  useEffect(() => {
    checkIfIsFavorite();
  }, [isFavorite]);

  const handleFavorite = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(favoriteRecipes);

    // const favoriteRecipeToAdd = {
    //   id,
    //   type: '',
    //   nationality: '',
    //   category: '',
    //   alcoholicOrNot: '',
    //   name: '',
    //   image: '',
    // };

    // let favoritesString = JSON.stringify([favoriteRecipeToAdd]);

    // if (favoriteRecipes === null) {
    //   localStorage.setItem('favoriteRecipes', favoritesString);
    //   setIsFavorite(isFavorite);
    if (favoriteRecipes.some(
      (favoriteRecipe) => favoriteRecipe.id === id,
    )) {
      console.log('entrou if favoritecards');
      const favoritesRemoved = favoriteRecipes.filter((favRecipe) => favRecipe.id !== id);
      const favoritesString = JSON.stringify(favoritesRemoved);
      setIsFavorite(!isFavorite);
      localStorage.setItem('favoriteRecipes', favoritesString);
    }

    // else {
    //   console.log('entrou else')
    //   favoritesString = JSON.stringify([...favoriteRecipes, favoriteRecipeToAdd]);
    //   setIsFavorite(isFavorite);
    // }
    // checkIfIsFavorite();
  };

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

      {

        <input
          type="image"
          data-testid={ `${index}-horizontal-favorite-btn"` }
          alt="Favorite button"
          onClick={ handleFavorite }
          src={ favoriteChecked }
        />
        // : (
        //   <input
        //     type="image"
        //     data-testid={ `${index}-horizontal-favorite-btn"` }
        //     alt="Favorite button"
        //     onClick={ handleFavorite }
        //     src={ favoriteNotChecked }
        //   />)
      }
    </div>
  );
}

FavoriteCards.propTypes = {
  index: PropTypes.number,
  img: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default FavoriteCards;
