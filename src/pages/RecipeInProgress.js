import React from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  return (
    <>
      <h2>Tela de receita em processo</h2>

      <img data-testid="recipe-photo" src="" alt="" />
      <div>
        <h1 data-testid="recipe-title">Nome da Receita</h1>
        <p data-testid="recipe-category">Categoria</p>

        <button data-testid="share-btn" type="button" onClick="">
          <img src={ shareIcon } alt="shareIcon" />
        </button>
        <button data-testid="favorite-btn" type="button" onClick="">
          <img src={ whiteHeart } alt="favorite" />
        </button>
      </div>

      <h2>Ingredients</h2>
      <label htmlFor="ingredient-checkbox">
        <input
          type="checkbox"
          // data-testid={ `${index}-ingredient-step` }
          id="ingredient-checkbox"
          name="ingredientCheckbox"
          value="ingredientCheckbox"
          onChange=""
        />
        Ingredient 1 500g
      </label>

      <h2 data-testid="instructions">Instructions</h2>
      <p>Texto das intruções</p>
      <button data-testid="finish-recipe-btn" type="button">Finish Recipe</button>
    </>
  );
}

export default RecipeInProgress;
