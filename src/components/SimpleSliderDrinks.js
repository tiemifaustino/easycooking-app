import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function SimpleSliderDrinks({ recommendedCards }) {
  const history = useHistory();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  const handleClick = (id) => {
    history.push(`/drinks/${id}`);
  };

  return (
    <div className="margin-carousel p-1">
      <Slider { ...settings }>
        {
          recommendedCards && recommendedCards.map((card, index) => (
            <div key={ card.idDrink }>
              <Card
                data-testid={ `${index}-recomendation-card` }
                key={ card.idDrink }
                style={ { width: '8.5rem' } }
                className="card-title card-carousel"
                role="button"
                onClick={ () => handleClick(card.idDrink) }
              >
                <Card.Img
                  src={ card.strDrinkThumb }
                  alt={ `${card.strDrink} thumbnail` }
                  variant="top"
                  className="card-carousel-img"
                />
                <Card.Text
                  className="title title-align container-page"
                >
                  {card.strAlcoholic}

                </Card.Text>
                <Card.Title
                  data-testid={ `${index}-recomendation-title` }
                  className="px-1 title-align"
                >
                  {card.strDrink}
                </Card.Title>
              </Card>
            </div>
          ))
        }
      </Slider>
    </div>
  );
}

SimpleSliderDrinks.propTypes = {
  recommendedCards: PropTypes.instanceOf(Array),
}.isRequired;

export default SimpleSliderDrinks;
