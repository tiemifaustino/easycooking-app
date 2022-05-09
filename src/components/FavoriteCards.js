import PropTypes from 'prop-types';
import React from 'react';
import { toast } from 'react-toastify';
import { Card } from 'react-bootstrap';
import FavoriteBtnHorizontal from './FavoriteBtnHorizontal';
import shareBtnLogo from '../images/shareIcon.svg';

function FavoriteCards({ index, title, img, category, nationality }) {
  const favoriteLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const handleShare = () => {
    toast.success('Link copied!');
    const textToCopy = window.location.href.replace('/in-progress', '');
    navigator.clipboard.writeText(textToCopy);
  };

  return (
    <Card className="m-3 title">
      <Card.Body className="d-flex p-0">
        <Card.Img
          data-testid={ `${index}-horizontal-image` }
          alt={ title }
          src={ img }
          style={ { width: '10rem' } }
          // variant="top"
        />

        <div className="d-flex flex-column justify-content-center m-2 ml-3">
          <Card.Title data-testid={ `${index}-horizontal-name` }>
            { title }
          </Card.Title>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {`${nationality} - ${category}`}
          </p>
          <p data-testid={ `${index}-horizontal-done-date` } />

          <div className="d-flex justify-content-around">
            <input
              type="image"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ handleShare }
              src={ shareBtnLogo }
              alt="Share button"
            />
            <FavoriteBtnHorizontal
              index={ index }
              id={ favoriteLocalStorage[index].id }
              type={ favoriteLocalStorage[index].type }
              nationality={ favoriteLocalStorage[index].nationality }
              category={ favoriteLocalStorage[index].category }
              name={ favoriteLocalStorage[index].name }
              image={ favoriteLocalStorage[index].image }
              alcoholicOrNot={ favoriteLocalStorage[index].alcoholicOrNot }
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

FavoriteCards.propTypes = {
  index: PropTypes.number,
  img: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default FavoriteCards;
