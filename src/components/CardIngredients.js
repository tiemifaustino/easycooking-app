import React from 'react';
import PropTypes from 'prop-types';

function CardIngredients({ index, img, title }) {
  return (
    <div data-testid={ `${index}-ingredient-card` }>
      <img
        data-testid={ `${index}-card-img` }
        alt={ title }
        src={ img }
      />
      <p data-testid={ `${index}-card-name` }>{ title }</p>
    </div>
  );
}

CardIngredients.propTypes = {
  index: PropTypes.number,
  img: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default CardIngredients;
