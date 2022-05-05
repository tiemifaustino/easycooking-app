import React, { Component } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class SimpleSliderRecipes extends Component {
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
              key={ card.idMeal }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                src={ card.strMealThumb }
                alt={ `${card.strMeal} thumbnail` }
              />
              <p>{card.strCategory}</p>
              <p data-testid={ `${index}-recomendation-title` }>{card.strMeal}</p>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

SimpleSliderRecipes.propTypes = {
  recommendedCards: PropTypes.any,
}.isRequired;

export default SimpleSliderRecipes;
