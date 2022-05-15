import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './testHelpers/test-utils.jsx';
import App from '../App';
import fetchRequest from '../../cypress/mocks/fetch';
import SimpleSliderDrinks from '../components/SimpleSliderDrinks';

describe('Testing page <RecipeDetails.js>', () => {
  const recommendedCards = [{
    dateModified: '2016-07-18 22:06:00',
    idDrink: '15997',
    strAlcoholic: 'Optional alcohol',
    strCategory: 'Ordinary Drink',
    strDrink: 'GG',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  }];
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
  const ROUTE = { initialEntries: ['/foods/52771'] };
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => fetchRequest(url));
  });
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });
  it('expect the page to have the recipe thumbnail image', async () => {
    renderWithRouterAndRedux(<App />, ROUTE);
    const thumbnail = await screen.findByRole('img', { name: /recipe thumbnail/i });
    expect(thumbnail).toBeInTheDocument();
  });
  it('expect the page to have the recipe title', async () => {
    renderWithRouterAndRedux(<App />, ROUTE);
    const heading = await screen.findByRole('heading',
      { name: /spicy arrabiata penne/i });
    expect(heading).toBeInTheDocument();
  });
  it('expect the page to have the recipe category', async () => {
    renderWithRouterAndRedux(<App />, ROUTE);
    const category = await screen.findByText(/vegetarian/i);
    expect(category).toBeInTheDocument();
  });
  it('expect the page to have the share button', async () => {
    renderWithRouterAndRedux(<App />, ROUTE);
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    const shareBtn = await screen.findByRole('img', { name: /shareicon/i });
    expect(shareBtn).toBeInTheDocument();
    userEvent.click(shareBtn);
  });
  it('expects the page will be redirect when the button start is clicked ', async () => {
    const { history } = renderWithRouterAndRedux(<App />, ROUTE);
    const recipeBtn = await screen.findByRole('button', { name: /start recipe/i });
    userEvent.click(recipeBtn);
    expect(history.location.pathname).toBe('/foods/52771/in-progress');
  });
  it('expect the page to have the favorite button', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    renderWithRouterAndRedux(<App />, ROUTE);
    const favBtn = await screen.findByRole('button', { name: /favorite/i });
    expect(favBtn).toBeInTheDocument();
    userEvent.click(favBtn);
  });
  it('If the recipe already is in the LocalStorage it should be removed', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesToRemove));
    renderWithRouterAndRedux(<App />, ROUTE);
    const favBtn = await screen.findByRole('button', { name: /favorite/i });
    expect(favBtn).toBeInTheDocument();
    userEvent.click(favBtn);
  });
  it('If the recipe already is in the LocalStorage it should be removed', async () => {
    renderWithRouterAndRedux(<App />, ROUTE);
    const favBtn = await screen.findByRole('button', { name: /favorite/i });
    expect(favBtn).toBeInTheDocument();
    userEvent.click(favBtn);
  });
  it('expects the carroussel to be working', async () => {
    renderWithRouterAndRedux(<SimpleSliderDrinks
      recommendedCards={ recommendedCards }
    />, ROUTE);
    const teste = await screen.findByRole('img', { name: /gg thumbnail/i });
    userEvent.click(teste);
  });
});
