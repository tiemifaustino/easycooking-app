import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './testHelpers/test-utils.jsx';
import App from '../App';
import fetchRequest from '../../cypress/mocks/fetch';

describe('Testing page <CocktailsDetails.js>', () => {
  const ROUTE = { initialEntries: ['/foods/52771/in-progress'] };
  const ROUTE_DRINKS = { initialEntries: ['/drinks/178319/in-progress'] };

  const doneRecipes = [{
    52771: [
      'penne rigate',
      'olive oil',
      'garlic',
      'chopped tomatoes',
      'red chile flakes',
      'italian seasoning',
      'basil',
      'Parmigiano-Reggiano',
    ] },
  ];
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => fetchRequest(url));
  });
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });
  it('expect the page to have the cocktail thumbnail image', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(doneRecipes));
    renderWithRouterAndRedux(<App />, ROUTE);
    const thumbnail = await screen.findByRole('img',
      { name: /spicy arrabiata penne image/i });
    expect(thumbnail).toBeInTheDocument();
  });
  it('expects the checkboxes to be saved in the local storage', async () => {
    renderWithRouterAndRedux(<App />, ROUTE);
    const teste = await screen.findByRole('checkbox', { name: /penne rigate/i });
    userEvent.click(teste);
  });
  it('expects the checkboxes to be saved in the local storage', async () => {
    renderWithRouterAndRedux(<App />, ROUTE_DRINKS);
    const teste = await screen.findByRole('checkbox', { name: /hpnotiq/i });
    userEvent.click(teste);
  });
});
