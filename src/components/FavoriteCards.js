import PropTypes from 'prop-types';
import React from 'react';
import { toast } from 'react-toastify';
import { Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import FavoriteBtnHorizontal from './FavoriteBtnHorizontal';
import shareBtnLogo from '../images/shareIcon.svg';

function FavoriteCards({ id, index, name, img, type, category,
  nationality, alcoholic }) {
  const history = useHistory();

  const handleShare = () => {
    toast.success('Link copied!');
    let textToCopy = window.location.href.replace('/favorite-recipes', '');
    if (type === 'food') {
      textToCopy += `/foods/${id}`;
    } else if (type === 'drink') {
      textToCopy += `/drinks/${id}`;
    }

    navigator.clipboard.writeText(textToCopy);
  };

  const handleClick = () => {
    if (type === 'food') {
      history.push(`/foods/${id}`);
    } else if (type === 'drink') {
      history.push(`/drinks/${id}`);
    }
  };

  return (
    <Card className="mx-3 my-4 title card-background">
      <Card.Body className="d-flex p-0">

        <Card.Img
          type="image"
          data-testid={ `${index}-horizontal-image` }
          alt={ name }
          src={ img }
          style={ { width: '10.5rem' } }
          onClick={ handleClick }
        />

        <div
          className="d-flex flex-column justify-content-center
          align-items-stretch card-favorite m-0 py-1 px-2"
        >

          <p data-testid={ `${index}-horizontal-top-text` } className="title-align">
            {`${nationality} - ${category}`}
          </p>
          <p data-testid={ `${index}-horizontal-done-date` } />
          <p
            data-testid={ `${index}-horizontal-top-text` }
            className="title-align"
          >
            {alcoholic}

          </p>

          <div className="d-flex justify-content-around my-1">
            <input
              type="image"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ handleShare }
              src={ shareBtnLogo }
              alt="Share button"
            />
            <FavoriteBtnHorizontal
              index={ index }
              id={ id }
              type={ type }
              nationality={ nationality }
              category={ category }
              name={ name }
              image={ img }
              alcoholicOrNot={ alcoholic }
            />
          </div>
        </div>
      </Card.Body>
      <Link
        to={ `/${type}s/${id}` }
        data-testid={ `${index}-horizontal-name` }
        className="card-title py-2"
      >
        <h5 className="title-align pt-2 m-0">{name}</h5>
      </Link>
    </Card>
  );
}

FavoriteCards.propTypes = {
  index: PropTypes.number,
  img: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default FavoriteCards;
