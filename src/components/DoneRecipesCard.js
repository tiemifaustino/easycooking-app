import React from 'react';
import PropTypes from 'prop-types';

function DoneRecipesCard({ index, title, img }) {
  return (
    <div>
      <img
        data-testid={ `${index}-horizontal-image` }
        alt={ title }
        src={ img }
      />
      <p data-testid={ `${index}-horizontal-name` } />
      <p
        data-testid={ `${index}-horizontal-top-text` }
      />
    </div>
  );
}

DoneRecipesCard.propTypes = {
  index: PropTypes.number,
  img: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default DoneRecipesCard;
