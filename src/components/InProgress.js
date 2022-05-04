import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import favoriteNotChecked from '../images/whiteHeartIcon.svg';
import favoriteChecked from '../images/blackHeartIcon.svg';
import shareBtnLogo from '../images/shareIcon.svg';

function InProgress({ page, id, ingredients, measurements }) {
  const [inputChecked, setInputChecked] = useState([]);
  const [saveLocalStorage, setSaveLocalStorage] = useState({ cocktails: {}, meals: {} });

  useEffect(() => {
    const handleLocalStorage = () => {
      switch (page) {
      case 'food':
        setSaveLocalStorage({
          ...saveLocalStorage,
          meals: {
            ...saveLocalStorage.meals,
            [id]: inputChecked,
          },
        });
        break;
      case 'drink':
        setSaveLocalStorage({
          ...saveLocalStorage,
          cocktails: {
            ...saveLocalStorage.cocktails,
            [id]: inputChecked,
          },
        });
        break;
      default:
        break;
      }
    };
    if (inputChecked.length > 0) handleLocalStorage();
  }, [inputChecked]);

  const handleInputChecked = ({ target: { value, checked } }) => (checked
    ? setInputChecked([...inputChecked, value])
    : setInputChecked(inputChecked
      .filter((ingredient) => ingredient !== value)));

  return (
    meal.length > 0
      ? (
        <div>
          <img
            src={ meal[0].strMealThumb }
            alt="recipe thumbnail"
            data-testid="recipe-photo"
          />
          <div>
            <h2 data-testid="recipe-title">{meal[0].strMeal}</h2>
            <input
              type="image"
              data-testid="share-btn"
              onClick={ handleShare }
              src={ shareBtnLogo }
              alt="Share button"
            />
            {isFavorite
              ? (
                <input
                  type="image"
                  data-testid="favorite-btn"
                  alt="Favorite button"
                  src={ favoriteChecked }
                  onClick={ handleFavorite }
                />)
              : (
                <input
                  type="image"
                  data-testid="favorite-btn"
                  alt="Favorite button"
                  src={ favoriteNotChecked }
                  onClick={ handleFavorite }
                />) }
            <p data-testid="recipe-category">{meal[0].strCategory}</p>
          </div>

          <div>
            <h2>Ingredients</h2>
            {ingredients.map((ingredient, index) => (
              <div
                key={ `${index}-ingredient-name-and-measure` }
                data-testid={ `${index}-ingredient-step` }
              >
                <label
                  htmlFor={ `${index}-ingredient-step` }
                >
                  <input
                    type="checkbox"
                    id={ `${index}-ingredient-step` }
                    name="chkBox"
                    value={ ingredient }
                    onChange={ handleInputChecked }
                  />
                  {`${ingredient} ${measurements[index]}`}
                </label>
              </div>
            ))}
            <h2>Instructions</h2>
            <p data-testid="instructions">{meal[0].strInstructions}</p>
            <h2>Video</h2>
            {/* <iframe
                  width="420"
                  height="315"
                  data-testid="video"
                  src={ meal[0].strYoutube.replace('watch?v=', 'embed/') }
                  title="video da receita"
                /> */}
          </div>

          <button
            className="recipe-button"
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ numberOfSteps !== ingredients.length }
            onClick={ () => handleClick() }
          >
            Finish Recipe
          </button>

        </div>
      ) : '');
}

InProgress.propTypes = {
  id: PropTypes.string,
  page: PropTypes.string,
}.isRequired;

export default InProgress;
