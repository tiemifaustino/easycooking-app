import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './testHelpers/test-utils.jsx';
import App from '../App';
import fetchRequest from '../../cypress/mocks/fetch';
import DoneRecipesCard from '../components/DoneRecipesCard';

describe('Testing component <doneRecipeCard.js>', () => {
  const ROUTE = { initialEntries: ['/foods/52771/in-progress'] };
  const favoriteRecipes = [
    {
      alcoholicOrNot: '',
      category: 'Pasta',
      id: '52844',
      image: 'https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg',
      name: 'Lasagne',
      nationality: 'Italian',
      type: 'food',
    },
    {
      alcoholicOrNot: 'Alcoholic',
      category: 'Shot',
      id: '15288',
      image: 'https://www.thecocktaildb.com/images/media/drink/rtpxqw1468877562.jpg',
      name: '252',
      nationality: '',
      type: 'drink',
    },
  ];
  const favoriteRecipesToRemove = [
    {
      category: 'Vegetarian',
      id: '52771',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      name: 'Spicy Arrabiata Penne',
      alcoholicOrNot: '',
      type: 'food',
      nationality: 'Italian',
    },
  ];

  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => fetchRequest(url));
  });
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });
  it(`The finish recipe button can only be enabled if all ingredients are checked,
  after clicking the app should be redirected to the done-recipes page`, async () => {
    const { history } = renderWithRouterAndRedux(<App />, ROUTE);
    const ingredientStep = await screen.findAllByTestId(/ingredient-step/i);
    const finshRecipe = screen.getByRole('button', {
      name: /finish recipe/i,
    });
    expect(finshRecipe).toBeDisabled();
    ingredientStep.forEach((step) => userEvent.click(step));
    userEvent.click(finshRecipe);
    expect(history.location.pathname).toBe('/foods/52771/in-progress');
  });
  it('The page must have the thumbnail and the name of the recipe', async () => {
    renderWithRouterAndRedux(<DoneRecipesCard
      id="52771"
      index="0"
      name="Spicy Arrabiata Penne"
      img="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"
      type="food"
      category="Vegetarian"
      nationality="Italian"
      alcoholic=""
      doneDate="Sat May 14 2022"
      tags={ ['Pasta', 'Curry'] }
    />);
    const horizontalImage = await screen.findByTestId(/0-horizontal-image/i);
    const horizontalTop = await screen.findAllByTestId('0-horizontal-top-text');
    expect(horizontalImage).toBeInTheDocument();
    expect(horizontalTop).toHaveLength(2);
  });
  it('The page must have all the TAGS and the date the recipe was finished', async () => {
    renderWithRouterAndRedux(<DoneRecipesCard
      id="52771"
      index="0"
      name="Spicy Arrabiata Penne"
      img="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"
      type="food"
      category="Vegetarian"
      nationality="Italian"
      alcoholic=""
      doneDate="Sat May 14 2022"
      tags={ ['Pasta', 'Curry'] }
    />);
    const doneDate = await screen.findByTestId('0-horizontal-done-date');
    const tag = await screen.findByTestId(/Pasta-horizontal-tag/i);
    expect(doneDate).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
  });
  it(`when clicking on the share button, the recipe link inside the app
   should be copied to the clipboard and a message warning that 
   the link has been copied should appear`, async () => {
    renderWithRouterAndRedux(<DoneRecipesCard
      id="52771"
      index="0"
      name="Spicy Arrabiata Penne"
      img="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"
      type="food"
      category="Vegetarian"
      nationality="Italian"
      alcoholic=""
      doneDate="Sat May 14 2022"
      tags={ ['Pasta', 'Curry'] }
    />, ROUTE);
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    const shareBtn = screen.getByRole('button', {
      name: /share button/i,
    });
    userEvent.click(shareBtn);
  });
  it('The FAVORITEBTN must sent the recipe to the localStorage', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    renderWithRouterAndRedux(<DoneRecipesCard
      id="52771"
      index="0"
      name="Spicy Arrabiata Penne"
      img="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"
      type="food"
      category="Vegetarian"
      nationality="Italian"
      alcoholic=""
      doneDate="Sat May 14 2022"
      tags={ ['Pasta', 'Curry'] }
    />);
    const favBtn = screen.getByRole('img', {
      name: /favorite/i,
    });
    userEvent.click(favBtn);
  });
  it('If the recipe already is in the LocalStorage it should be removed', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesToRemove));
    renderWithRouterAndRedux(<DoneRecipesCard
      id="52771"
      index="0"
      name="Spicy Arrabiata Penne"
      img="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"
      type="food"
      category="Vegetarian"
      nationality="Italian"
      alcoholic=""
      doneDate="Sat May 14 2022"
      tags={ ['Pasta', 'Curry'] }
    />);
    const favBtn = screen.getByRole('img', {
      name: /favorite/i,
    });
    userEvent.click(favBtn);
  });
  it('should be possible to add more than 1 recipe to the local storage', async () => {
    renderWithRouterAndRedux(<DoneRecipesCard
      id="52771"
      index="0"
      name="Spicy Arrabiata Penne"
      img="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"
      type="food"
      category="Vegetarian"
      nationality="Italian"
      alcoholic=""
      doneDate="Sat May 14 2022"
      tags={ ['Pasta', 'Curry'] }
    />);
    const favBtn = screen.getByRole('img', {
      name: /favorite/i,
    });
    userEvent.click(favBtn);
  });
});
