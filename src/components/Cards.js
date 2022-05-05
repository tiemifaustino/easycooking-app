import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

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
    <div data-testid={ `${index}-recipe-card` }>

      <input
        type="image"
        data-testid={ `${index}-card-img` }
        alt={ title }
        src={ img }
        onClick={ handleClick }
      />
      <p data-testid={ `${index}-card-name` }>{ title }</p>
    </div>
  );
}

Cards.propTypes = {
  index: PropTypes.number,
  img: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
}.isRequired;

export default Cards;
