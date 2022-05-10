import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import DoneRecipesCard from '../components/DoneRecipesCard';

function DoneRecipes() {
  const [finishRecipe, setFinishRecipe] = useState([]);
  const [filter, setFilter] = React.useState('');
  useEffect(() => {
    setFinishRecipe(JSON.parse(localStorage.getItem('doneRecipes')));
  }, []);

  return (
    <>
      <Header title="Done Recipes" visible={ false } />
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => setFilter('') }
      >
        All
      </button>
      <button
        data-testid="filter-by-food-btn"
        type="button"
        onClick={ () => setFilter('food') }
      >
        Food
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => setFilter('drink') }
      >
        Drinks
      </button>

      {
        finishRecipe && finishRecipe.filter((item) => item.type.includes(filter))
          .map((recipe, index) => (
            <DoneRecipesCard
              key={ `${index}` }
              id={ recipe.id }
              index={ index }
              name={ recipe.name }
              img={ recipe.image }
              type={ recipe.type }
              category={ recipe.category }
              nationality={ recipe.nationality }
              alcoholic={ recipe.alcoholicOrNot }
              doneDate={ recipe.doneDate }
              tags={ [...recipe.tags] }
            />
          ))
      }
    </>

  );
}

export default DoneRecipes;
