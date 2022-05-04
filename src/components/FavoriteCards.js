import PropTypes from 'prop-types';
import React from 'react';
import { toast } from 'react-toastify';
import shareBtnLogo from '../images/shareIcon.svg';

function FavoriteCards({ index, title, img }) {
  const handleShare = () => {
    toast.success('Link copied!');
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div>
      <img
        data-testid={ `${index}-horizontal-image` }
        alt={ title }
        src={ img }
      />
      <p data-testid={ `${index}-horizontal-name` } />
      <p data-testid={ `${index}-horizontal-top-text` } />
      <p data-testid={ `${index}-horizontal-done-date` } />
      <input
        type="image"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ handleShare }
        src={ shareBtnLogo }
        alt="Share button"
      />
    </div>
  );
}

FavoriteCards.propTypes = {
  index: PropTypes.number,
  img: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default FavoriteCards;
