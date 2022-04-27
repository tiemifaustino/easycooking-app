import React from 'react';
import PropTypes from 'prop-types';

function Cards({ index, img, title }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        alt={ title }
        src={ img }
      />
      <p data-testid={ `${index}-card-name` }>{ title }</p>
    </div>
  );
}

Cards.propTypes = {
  index: PropTypes.number,
  img: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default Cards;
