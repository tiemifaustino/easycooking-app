import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explore() {
  const history = useHistory();

  return (
    <div className="container-page">
      <Header title="Explore" visible={ false } />

      <div className="d-flex flex-column mx-5 mt-5">
        <Button
          data-testid="explore-foods"
          type="button"
          onClick={ () => history.push('/explore/foods') }
          variant="danger"
          size="lg"
          className="my-3"
        >
          Explore Foods
        </Button>
        <Button
          data-testid="explore-drinks"
          type="button"
          onClick={ () => history.push('/explore/drinks') }
          variant="danger"
          size="lg"
          className="my-3"
        >
          Explore Drinks
        </Button>
      </div>

      <Footer />
    </div>
  );
}

export default Explore;
