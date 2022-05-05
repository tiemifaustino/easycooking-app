import React, { Component } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class SimpleSliderDrinks extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
    };
    const { recommendedCards } = this.props;
    return (
      <div>
        <Slider { ...settings }>
          {recommendedCards && recommendedCards.map((card, index) => (
            <div
              key={ card.idDrink }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                src={ card.strDrinkThumb }
                alt={ `${card.strDrink} thumbnail` }
              />
              <p>{card.strAlcoholic}</p>
              <p data-testid={ `${index}-recomendation-title` }>{card.strDrink}</p>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

SimpleSliderDrinks.propTypes = {
  recommendedCards: PropTypes.any,
}.isRequired;

export default SimpleSliderDrinks;
