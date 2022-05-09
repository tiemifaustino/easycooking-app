import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ShareBtn from './ShareBtn';
import FavoriteBtn from './favoriteBtn';

function InProgress({ page, id, recipe, saveLocal }) {
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
    handleLocalStorage();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputChecked]);

  useEffect(() => {
    const localStorageSave = () => {
      localStorage.setItem('inProgressRecipes', JSON.stringify(saveLocalStorage));
    };
    localStorageSave();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveLocalStorage]);

  const handleInputChecked = ({ target: { value, checked } }) => (checked
    ? setInputChecked([...inputChecked, value])
    : setInputChecked(inputChecked
      .filter((ingredient) => ingredient !== value)));

  const handleClick = () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const currentRecipe = {
      id,
      type: recipe.type,
      nationality: recipe.nationality,
      category: recipe.category,
      alcoholicOrNot: recipe.alcoholicOrNot,
      name: recipe.name,
      image: recipe.image,
      doneDate: today.toDateString(),
      tags: recipe.tags,
    };

    if (!doneRecipes) {
      const doneRecipeString = JSON.stringify([currentRecipe]);
      localStorage.setItem('doneRecipes', doneRecipeString);
    } else {
      const doneRecipeString = JSON.stringify([...doneRecipes, currentRecipe]);
      localStorage.setItem('doneRecipes', doneRecipeString);
    }
    history.push('/done-recipes');
  };

  return (
    <div>
      {
        recipe ? (
          <div>
            <div>
              <img
                data-testid="recipe-photo"
                src={ recipe.image }
                alt="Ilustração da Receita"
              />
              <span data-testid="recipe-title">
                {recipe.name}
              </span>
            </div>

            <div>
              <p data-testid="recipe-category">{recipe.category}</p>
              <ShareBtn />
              <FavoriteBtn
                id={ id }
                type={ page }
                nationality={ recipe.nationality }
                category={ recipe.category }
                name={ recipe.name }
                image={ recipe.image }
                alcoholicOrNot={ recipe.alcoholicOrNot }
              />
            </div>

            <div>
              <h2>
                Ingredients
                {console.log(recipe)}
              </h2>
              {
                recipe.ingredients.map((ingredient, index) => ingredient && (
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
                        checked={ inputChecked?.some((value) => value === ingredient) }
                      />
                      {ingredient}
                    </label>
                  </div>
                ))
              }
            </div>
            <div>
              <h2>Instructions</h2>
              <span data-testid="instructions">{recipe.preparation}</span>
              <button
                data-testid="finish-recipe-btn"
                type="button"
                disabled={ inputChecked && inputChecked.length !== recipe.ingredients
                  .filter((value) => value !== undefined && value).length }
                onClick={ handleClick }
              >
                Finish Recipe
              </button>
            </div>
          </div>
        ) : ''
      }
    </div>
  );
}

InProgress.propTypes = {
  id: PropTypes.string,
  page: PropTypes.string,
}.isRequired;

export default InProgress;
