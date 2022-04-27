import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Cards from '../components/Cards';
import Footer from '../components/Footer';

function Foods() {
  const foods = useSelector((state) => state.recipeReducer.recipe.meals);
  return (
    <div>
      <Header title="Foods" visible />

      {
        foods && foods.map((meal, index) => {
          const maxFoods = 11;
          if (index > maxFoods) return;
          return (
            <Cards
              key={ meal.strMeal }
              img={ meal.strMealThumb }
              index={ index }
              title={ meal.strMeal }
            />
          );
        })
      }
      <Footer />
    </div>
  );
}

export default Foods;
