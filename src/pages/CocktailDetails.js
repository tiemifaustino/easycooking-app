import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { requestCocktailByIDThunk } from '../actions/index.actions';

function CocktailDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestCocktailByIDThunk(id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <img src="" alt="foto da receita x" data-testid="recipe-photo" />
      <div>
        <h2 data-testid="recipe-title">Titulo da Receita</h2>
        <button type="button" data-testid="share-btn">Share Btn</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <p data-testid="recipe-category">Tipo de receita</p>
      </div>

      <div>
        <ul>
          <h2>Ingredients</h2>
          <li
            data-testid={ `${0}-ingredient-name-and-measure` }
          >
            primeiro ingrediente

          </li>
          <li>segundo ingrediente</li>
        </ul>
        <h2>Instructions</h2>
        <p data-testid="instructions">as instrucoes balblalbalblalbla</p>
        <h2>Video</h2>
        <iframe
          width="420"
          height="315"
          data-testid="video"
          src="https://www.youtube.com/embed/tgbNymZ7vqY"
          title="video da receita"
        />
      </div>
      <div>
        <h2>Recommended</h2>
        <ul>
          <li data-testid={ `${0}-recomendation-card` } />
          <li data-testid={ `${1}-recomendation-card` } />
        </ul>
      </div>
      <button type="button" data-testid="start-recipe-btn">Start Recipe</button>
    </div>
  );
}

export default CocktailDetails;
