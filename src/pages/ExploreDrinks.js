import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { requestCocktailSupriseThunk } from '../actions/index.actions';

function ExploreDrinks() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { cocktailSuprise } = useSelector((state) => state.cocktailSupriseReducer);

  useEffect(() => {
    dispatch(requestCocktailSupriseThunk());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickSuprise = () => {
    const { idDrink } = cocktailSuprise.drinks[0];
    history.push(`/drinks/${idDrink}`);
  };

  return (
    <div className="container-page">
      <Header title="Explore Drinks" visible={ false } />

      <div className="d-flex flex-column mx-5 mt-5">
        <Button
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ () => history.push('/explore/drinks/ingredients') }
          variant="danger"
          size="lg"
          className="my-3"
        >
          By Ingredient
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

export default ExploreDrinks;
