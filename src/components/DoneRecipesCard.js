import React from 'react';
import PropTypes from 'prop-types';

function DoneRecipesCard({ index, title }) {
  return (
    <div data-testid="0-horizontal-image">
      <img
        data-testid={ `${index}-horizontal-image` }
        alt={ title }
        src={ imageChicken }
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
