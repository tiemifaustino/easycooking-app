import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import { Button } from 'react-bootstrap';
import ShareBtn from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';

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
            <Image
              data-testid="recipe-photo"
              src={ recipe.image }
              alt={ `${recipe.name} image` }
              className="img-fluid"
            />

            <div
              className="name-recipe d-flex justify-content-between
                  align-items-center pt-2 px-3"
            >
              <div>
                <h2 data-testid="recipe-title">{ recipe.name }</h2>
                <p data-testid="recipe-category">{recipe.category}</p>
              </div>

              <div className="d-flex align-items-center ">
                <div className="container-icons mx-1">
                  <ShareBtn />
                </div>
                <div className="container-icons mx-1">
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
              </div>
            </div>

            <div>
              <h2 className="title-h2-page-details px-3 m-3">Ingredients</h2>
              <div className="mx-4 px-4 py-4 container-details">
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
                          className="mr-2"
                        />
                        {ingredient}
                      </label>
                    </div>
                  ))
                }
              </div>
            </div>

            <div className="margin-instructions">
              <h2
                className="title-h2-page-details px-3 m-3"
              >
                Instructions

              </h2>
              <p
                data-testid="instructions"
                className="container-details mx-4 p-3 mb-5"
              >
                {recipe.preparation}

              </p>

            </div>

            <footer className="d-flex justify-content-center footer-button">
              <Button
                data-testid="finish-recipe-btn"
                type="button"
                disabled={ inputChecked && inputChecked.length !== recipe.ingredients
                  .filter((value) => value !== undefined && value).length }
                onClick={ handleClick }
                className="my-2"
                size="lg"
                variant="danger"
              >
                Finish Recipe
              </Button>

            </footer>

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
