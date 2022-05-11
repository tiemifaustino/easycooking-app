import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

function CardIngredients({ index, img, title }) {
  return (
    <Card.Body
      data-testid={ `${index}-ingredient-card` }
      className="px-0"
    >
      <Card.Img
        data-testid={ `${index}-card-img` }
        alt={ title }
        src={ img }
        variant="top"
        className="mb-3 px-1"
      />
      <Card.Text
        data-testid={ `${index}-card-name` }
        className="d-flex justify-content-center align-items-center cardIngredients py-4"
      >
        { title }

      </Card.Text>
    </Card.Body>
  );
}

CardIngredients.propTypes = {
  index: PropTypes.number,
  img: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default CardIngredients;
