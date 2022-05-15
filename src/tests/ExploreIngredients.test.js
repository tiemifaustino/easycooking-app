import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './testHelpers/test-utils.jsx';

describe.only('Testing page <EXPLORE INGREDIENTS.js>', () => {
  const ROUTE_FOODS = { initialEntries: ['/explore/foods/ingredients'] };
  const ROUTE_DRINKS = { initialEntries: ['/explore/drinks/ingredients'] };
  const initialState = { ingredientsReducer: { ingredients: [{
    idIngredient: '1',
    strIngredient: 'Chicken',
    strDescription: 'The chicken is a type of domesticated fowl, a subspecies...',
    strType: null,
  },
  {
    idIngredient: '2',
    strIngredient: 'Salmon',
    strDescription: 'Salmon is the common name for several species...',
    strType: null,
  },
  {
    idIngredient: '3',
    strIngredient: 'Beef',
    strDescription: 'Beef is the culinary',
    strType: null,
  }] } };
  const drinkInitialState = { ingredientsReducer: { drinksIngredients: [
    {
      strIngredient1: 'Light rum',
    },
    {
      strIngredient1: 'Applejack',
    },
    {
      strIngredient1: 'Gin',
    },
  ] } };
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => fetchRequest(url));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`expects EXPLORE  INGREDIENTS heading to be present 
  on the EXPLORE INGREDIENTS FOODS PAGE`, async () => {
    renderWithRouterAndRedux(<App />, ROUTE_FOODS);
    const heading = screen.getByRole('heading', {
      name: /explore ingredients/i,
    });
    expect(heading).toBeInTheDocument();
  });
  it(`expects EXPLORE  INGREDIENTS heading to be present 
  on the EXPLORE INGREDIENTS DRINKS PAGE`, () => {
    renderWithRouterAndRedux(<App />, ROUTE_DRINKS);
    const heading = screen.getByRole('heading', {
      name: /explore ingredients/i,
    });

    expect(heading).toBeInTheDocument();
  });
  it('the ingredients cards should be present in the foods page', async () => {
    renderWithRouterAndRedux(<App />, {
      initialState, initialEntries: ['/explore/foods/ingredients'] });
    const cardImage = await screen.findByTestId('0-card-img');
    expect(cardImage).toBeInTheDocument();
    userEvent.click(cardImage);
  });
  it('the ingredients cards should be present in the drinks page', async () => {
    renderWithRouterAndRedux(<App />, {
      initialState: drinkInitialState, initialEntries: ['/explore/drinks/ingredients'] });
    const cardImage = await screen.findByTestId('0-card-img');
    expect(cardImage).toBeInTheDocument();
    userEvent.click(cardImage);
  });
});
