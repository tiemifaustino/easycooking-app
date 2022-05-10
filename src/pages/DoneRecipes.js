import { Button } from 'react-bootstrap';
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
    <div className="container-cards container-page-explore">
      <Header title="Done Recipes" visible={ false } />

      <div className="d-flex justify-content-center mt-3 mb-4">
        <div className="container-buttons d-flex justify-content-center m-0">
          <Button
            data-testid="filter-by-all-btn"
            type="button"
            variant="dark"
            size="md"
            onClick={ () => setFilter('') }
          >
            All
          </Button>
          <Button
            data-testid="filter-by-food-btn"
            type="button"
            variant="dark"
            size="md"
            className="mx-2 px-4"
            onClick={ () => setFilter('food') }
          >
            Food
          </Button>
          <Button
            data-testid="filter-by-drink-btn"
            type="button"
            variant="dark"
            size="md"
            className="mx-2 px-4"
            onClick={ () => setFilter('drink') }
          >
            Drinks
          </Button>
        </div>
      </div>
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

      <DoneRecipesCard />
    </div>
  );
}

export default DoneRecipes;
