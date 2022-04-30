import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import { requestRecipeListAreaThunk,
  requestRecipeByNationalityThunk } from '../actions/index.actions';

function ExploreNationalities() {
  const { recipeArea } = useSelector((state) => state.recipeListAreaReducer);
  const { recipeNationality } = useSelector((state) => state.recipeNationalityReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestRecipeListAreaThunk());
    dispatch(requestRecipeByNationalityThunk());
  }, []);

  return (
    <>
      <Header title="Explore Nationalities" visible />
      <div>
        {/* {console.log(recipeNationality, 'aqui')} */}
        <select data-testid="explore-by-nationality-dropdown">
          {
            recipeArea && recipeArea.map((nationality, index) => (
              <option
                key={ nationality.strArea + index }
                data-testid={ `${nationality.strArea}-option` }
              >
                { nationality.strArea }
              </option>
            ))
          }
        </select>
        {
          recipeNationality && recipeNationality.map((nationality, index) => {
            const maxnationality = 11;
            if (index > maxnationality) return;
            return (
              <Cards
                key={ nationality.strMeal }
                img={ nationality.strMealThumb }
                index={ index }
                title={ nationality.strMeal }
              />
            );
          })
        }
      </div>
      <Footer />
    </>
  );
}

export default ExploreNationalities;
