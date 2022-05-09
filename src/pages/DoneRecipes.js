import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import DoneRecipesCard from '../components/DoneRecipesCard';

function DoneRecipes() {
  const [finishRecipe, setFinishRecipe] = useState([]);
  useEffect(() => {
    setFinishRecipe(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);

  return (
    <>
      <Header title="Done Recipes" visible={ false } />
      <button
        data-testid="filter-by-all-btn"
        type="button"
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
      >
        Drinks
      </button>

      {
        finishRecipe?.map((recipe, index) => (
          <DoneRecipesCard
            key={ `${index}` }
            id={ recipe.id }
            index={ index }
            name={ recipe.name }
            img={ recipe.image }
            type={ recipe.type }
            category={ recipe.category }
            nationality={ recipe.nationality }
            alcoholic={ recipe.alcoholic }
            doneDate={ recipe.doneDate }
            tags={ [...recipe.tags] }
          />
        ))
      }
    </>

  );
}

export default DoneRecipes;
