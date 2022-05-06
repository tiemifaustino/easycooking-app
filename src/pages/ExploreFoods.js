import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { requestRecipeSupriseThunk } from '../actions/index.actions';

function ExploreFoods() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { recipeSuprise } = useSelector((state) => state.recipeSupriseReducer);

  useEffect(() => {
    dispatch(requestRecipeSupriseThunk());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickSuprise = () => {
    const { idMeal } = recipeSuprise.meals[0];
    history.push(`/foods/${idMeal}`);
  };

  return (
    <div className="container-page">
      <Header title="Explore Foods" visible={ false } />

      <div className="d-flex flex-column mx-5 mt-5">
        <Button
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ () => history.push('/explore/foods/ingredients') }
          variant="danger"
          size="lg"
          className="my-3"
        >
          By Ingredient
        </Button>

        <Button
          data-testid="explore-by-nationality"
          type="button"
          onClick={ () => history.push('/explore/foods/nationalities') }
          variant="danger"
          size="lg"
          className="my-3"
        >
          By Nationality
        </Button>

        <Button
          data-testid="explore-surprise"
          type="button"
          onClick={ handleClickSuprise }
          variant="danger"
          size="lg"
          className="my-3"
        >
          Surprise me!
        </Button>
      </div>

      <Footer />
    </div>
  );
}

export default ExploreFoods;
