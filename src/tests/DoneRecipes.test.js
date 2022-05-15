import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './testHelpers/test-utils.jsx';
import App from '../App';
import fetchRequest from '../../cypress/mocks/fetch';

const doneRecipes = [
  { alcoholicOrNot: 'Optional alcohol',
    category: 'Ordinary Drink',
    doneDate: 'Sat May 14 2022',
    id: '15997',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    name: 'GG',
    nationality: '',
    tags: '',
    type: 'drink',
  },
  {
    alcoholicOrNot: '',
    category: 'Beef',
    doneDate: 'Sat May 14 2022',
    id: '53013',
    image: 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg',
    name: 'Big Mac',
    nationality: 'American',
    tags: null,
    type: 'food',
  }];

describe('Testing page <ExploreFoods.js>', () => {
  const ROUTE = { initialEntries: ['/done-recipes'] };
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => fetchRequest(url));
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  });
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });
  it(`expects FAVORITE RECIPES heading to be present 
  on the FAVORITES PAGE`, () => {
    renderWithRouterAndRedux(<App />, ROUTE);
    const heading = screen.getByRole('heading', { name: /done recipes/i });

    expect(heading).toBeInTheDocument();
  });
  it('should contain an all button', () => {
    renderWithRouterAndRedux(<App />, ROUTE);
    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });
    userEvent.click(allBtn);
    expect(allBtn).toBeInTheDocument();
  });
  it('should contain a FOOD button', () => {
    renderWithRouterAndRedux(<App />, ROUTE);
    const foodBtn = screen.getByRole('button', {
      name: /food/i,
    });
    userEvent.click(foodBtn);
    expect(foodBtn).toBeInTheDocument();
  });
  it('should contain a DRINK button', () => {
    renderWithRouterAndRedux(<App />, ROUTE);
    const drinkBtn = screen.getByRole('button', {
      name: /drink/i,
    });
    userEvent.click(drinkBtn);
    expect(drinkBtn).toBeInTheDocument();
  });
});
