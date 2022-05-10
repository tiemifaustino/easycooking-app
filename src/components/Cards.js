import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import './Cards.css';

function Cards({ index, img, title, id }) {
  const history = useHistory();
  const handleClick = () => {
    if (window.location.href.includes('/foods')) {
      history.push(`/foods/${id}`);
    } else if (window.location.href.includes('/drinks')) {
      history.push(`/drinks/${id}`);
    }
  };

  return (
    <Card
      data-testid={ `${index}-recipe-card` }
      style={ { width: '9rem' } }
      className="d-flex flex-column m-2 card-component"
    >
      <Card.Img
        variant="top"
        type="image"
        data-testid={ `${index}-card-img` }
        alt={ title }
        src={ img }
        onClick={ handleClick }
      />
      <Card.Text
        data-testid={ `${index}-card-name` }
        className="card-text p-2 d-flex justify-content-center align-items-center"
      >
        { title }

      </Card.Text>
    </Card>
  );
}

Cards.propTypes = {
  index: PropTypes.number,
  img: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
}.isRequired;

export default Cards;
