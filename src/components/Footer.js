import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();

  const handleDrinkClick = () => {
    history.push('/drinks');
  };
  const handleExploreClick = () => {
    history.push('/explore');
  };
  const handleFoodsClick = () => {
    history.push('/foods');
  };

  return (
    <footer data-testid="footer">
      <button
        type="button"
        onClick={ handleDrinkClick }
      >
        <img src={ drinkIcon } alt="drinkIcon" data-testid="drinks-bottom-btn" />
      </button>
      <button
        type="button"
        onClick={ handleExploreClick }
      >
        <img src={ exploreIcon } alt="exploreIcon" data-testid="explore-bottom-btn" />
      </button>
      <button
        type="button"
        onClick={ handleFoodsClick }
      >
        <img src={ mealIcon } alt="mealIcon" data-testid="food-bottom-btn" />
      </button>

    </footer>
  );
}
