import React from 'react';
import { useSelector } from 'react-redux';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Drinks() {
  const drinks = useSelector((state) => state.cocktailReducer.cocktail.drinks);
  return (
    <div>
      <Header title="Drinks" visible />
      {
        drinks && drinks.map((drink, index) => {
          const maxdrinks = 11;
          if (index > maxdrinks) return;
          return (
            <Cards
              key={ drink.strDrink }
              img={ drink.strDrinkThumb }
              index={ index }
              title={ drink.strDrink }
            />
          );
        })
      }
      <Footer />
    </div>
  );
}

export default Drinks;
