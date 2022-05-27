import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './testHelpers/test-utils.jsx';
import App from '../App';
import fetchRequest from '../../cypress/mocks/fetch';
import FavoriteCards from '../components/FavoriteCards';

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

describe('Testing page <ExploreFoods.js>', () => {
  const ROUTE = { initialEntries: ['/favorite-recipes'] };
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => fetchRequest(url));
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  });
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });
  it(`expects FAVORITE RECIPES heading to be present 
  on the FAVORITES PAGE`, () => {
    renderWithRouterAndRedux(<App />, ROUTE);
    const heading = screen.getByRole('heading', {
      name: /favorite recipes/i,
    });

    expect(heading).toBeInTheDocument();
  });
  it('should contain a ALL button', () => {
    renderWithRouterAndRedux(<App />, ROUTE);
    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(allBtn);
    expect(allBtn).toBeInTheDocument();
  });
  it('should contain a food button', () => {
    renderWithRouterAndRedux(<App />, ROUTE);
    const foodBtn = screen.getByRole('button', {
      name: /food/i,
    });
    userEvent.click(foodBtn);
    expect(foodBtn).toBeInTheDocument();
  });
  it('should contain a drink button', () => {
    renderWithRouterAndRedux(<App />, ROUTE);
    const drinkBtn = screen.getByRole('button', {
      name: /drink/i,
    });
    userEvent.click(drinkBtn);
    expect(drinkBtn).toBeInTheDocument();
  });
  it('The page must have the thumbnail and the name of the recipe', async () => {
    renderWithRouterAndRedux(<FavoriteCards
      id="52771"
      index="0"
      name="Spicy Arrabiata Penne"
      type="food"
      img="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"
      category="Vegetarian"
      nationality="Italian"
      alcoholic=""
    />);
    const horizontalImage = await screen.findByTestId(/0-horizontal-image/i);
    const horizontalTop = await screen.findAllByTestId('0-horizontal-top-text');
    expect(horizontalImage).toBeInTheDocument();
    expect(horizontalTop).toHaveLength(2);
    userEvent.click(horizontalImage);
  });
  it(`when clicking on the share button, the recipe link inside the app
   should be copied to the clipboard and a message warning that 
   the link has been copied should appear`, () => {
    renderWithRouterAndRedux(<FavoriteCards
      id="52771"
      index="0"
      name="Spicy Arrabiata Penne"
      type="food"
      img="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"
      category="Vegetarian"
      nationality="Italian"
      alcoholic=""
    />);
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
    renderWithRouterAndRedux(<FavoriteCards
      id="52771"
      index="0"
      name="Spicy Arrabiata Penne"
      type="food"
      img="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"
      category="Vegetarian"
      nationality="Italian"
      alcoholic=""
    />);
    const favBtn = screen.getByRole('img', {
      name: /favorite/i,
    });
    userEvent.click(favBtn);
  });
  it('If the recipe already is in the LocalStorage it should be removed', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesToRemove));
    renderWithRouterAndRedux(<FavoriteCards
      id="52771"
      index="0"
      name="Spicy Arrabiata Penne"
      type="food"
      img="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"
      category="Vegetarian"
      nationality="Italian"
      alcoholic=""
    />);
    const favBtn = screen.getByRole('img', {
      name: /favorite/i,
    });
    userEvent.click(favBtn);
  });
  it('should be possible to add more than 1 recipe to the local storage', async () => {
    renderWithRouterAndRedux(<FavoriteCards
      id="52771"
      index="0"
      name="Spicy Arrabiata Penne"
      type="food"
      img="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"
      category="Vegetarian"
      nationality="Italian"
      alcoholic=""
    />);
    const favBtn = screen.getByRole('img', {
      name: /favorite/i,
    });
    userEvent.click(favBtn);
  });
});
