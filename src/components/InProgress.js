import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import favoriteNotChecked from '../images/whiteHeartIcon.svg';
import shareBtnLogo from '../images/shareIcon.svg';

function InProgress({ page, id, meal, saveLocal }) {
  const [inputChecked, setInputChecked] = useState([]);
  const [saveLocalStorage, setSaveLocalStorage] = useState({ cocktails: {}, meals: {} });
  const history = useHistory();

  useEffect(() => {
    const getInputSaveLocalStorage = () => {
      setInputChecked(saveLocal);
    };
    getInputSaveLocalStorage();
  }, [saveLocal]);

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

  useEffect(() => {
    const localStorageSave = () => {
      localStorage.setItem('inProgressRecipes', JSON.stringify(saveLocalStorage));
    };
    if (inputChecked.length > 0) localStorageSave();
  }, [saveLocalStorage]);

  const handleInputChecked = ({ target: { value, checked } }) => (checked
    ? setInputChecked([...inputChecked, value])
    : setInputChecked(inputChecked
      .filter((ingredient) => ingredient !== value)));

  return (
    <div>
      {
        meal ? (
          <div>
            <div>
              <img
                data-testid="recipe-photo"
                src={ meal.image }
                alt="Ilustração da Receita"
              />
              <span data-testid="recipe-title">
                {meal.name}
              </span>
            </div>

            <div>
              <p data-testid="recipe-category">{meal.category}</p>
              <button data-testid="share-btn" type="button" onClick="">
                <img src={ shareBtnLogo } alt="shareIcon" />
              </button>
              <button data-testid="favorite-btn" type="button" onClick="">
                <img src={ favoriteNotChecked } alt="favorite" />
              </button>
            </div>

            <div>
              <h2>Ingredients</h2>
              {
                meal.ingredients.map((ingredient, index) => ingredient && (
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
                        value={ ingredient }
                        onChange={ handleInputChecked }
                        checked={ inputChecked.some((value) => value === ingredient) }
                      />
                      {ingredient}
                    </label>
                  </div>
                ))
              }
            </div>
            <div>
              <h2>Instructions</h2>
              <span data-testid="instructions">{meal.preparation}</span>
              <button
                data-testid="finish-recipe-btn"
                type="button"
                disabled={ inputChecked.length !== meal.ingredients
                  .filter((value) => value !== undefined && value).length }
                onClick={ () => history.push('/done-recipes') }
              >
                Finish Recipe
              </button>
            </div>
          </div>
        ) : <p>Loading</p>
      }
    </div>
  );
}

InProgress.propTypes = {
  id: PropTypes.string,
  page: PropTypes.string,
}.isRequired;

export default InProgress;
