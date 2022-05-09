import React, { useEffect, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Form from 'react-bootstrap/Form';
import Header from '../components/Header';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import { requestRecipeListAreaThunk,
  requestRecipeByNationalityThunk } from '../actions/index.actions';

function ExploreNationalities() {
  const { recipeArea } = useSelector((state) => state.recipeListAreaReducer);
  const { recipeNationality } = useSelector((state) => state.recipeNationalityReducer);
  const dispatch = useDispatch();
  const [nationalityValue, setNationalityValue] = useState('All');

  useEffect(() => {
    dispatch(requestRecipeListAreaThunk());
  }, []);

  const handleChangeOption = ({ target: { value } }) => {
    setNationalityValue(value);
  };

  useEffect(() => {
    dispatch(requestRecipeByNationalityThunk(nationalityValue));
  }, [nationalityValue]);

  return (
    <div className="container-page">
      <Header title="Explore Nationalities" visible />
      <div>

        <label
          htmlFor="explore-by-nationality-dropdown"
          className="mt-4 mx-4 mb-0 d-flex justify-content-center"
        >
          <select
            data-testid="explore-by-nationality-dropdown"
            value={ nationalityValue }
            onChange={ handleChangeOption }
            id="explore-by-nationality-dropdown"
            className="select-nacionalities"
          >
            <option
              value="All"
              data-testid="All-option"
            >
              All
            </option>
            {
              recipeArea.map((nationality, index) => (
                <option
                  key={ nationality.strArea + index }
                  data-testid={ `${nationality.strArea}-option` }
                  value={ nationality.strArea }
                >
                  { nationality.strArea }
                </option>
              ))
            }
          </select>
        </label>

        <div
          className="d-flex flex-wrap justify-content-center mx-2 mt-3 container-cards"
        >
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
                  id={ nationality.idMeal }
                />
              );
            })
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreNationalities;
