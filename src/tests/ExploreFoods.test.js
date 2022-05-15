import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './testHelpers/test-utils.jsx';

describe('Testing page <ExploreFoods.js>', () => {
  const ROUTE = { initialEntries: ['/explore/foods'] };
  const initialState = {
    recipeSupriseReducer: { recipeSuprise: { meals: [{ idMeal: '52805' }] } } };
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => fetchRequest(url));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('expects EXPLORE  FOODS heading to be present on the screen', () => {
    renderWithRouterAndRedux(<App />, ROUTE);
    const heading = screen.getByRole('heading', {
      name: /explore foods/i,
    });

    expect(heading).toBeInTheDocument();
  });
  it(`expects that when you click on the BY INGREDIENTS button you will
  be redirected to the EXPLORE FOODS BY INGREDIENTS page`, async () => {
    const { history } = renderWithRouterAndRedux(<App />, ROUTE);
    const exploreByIngredientBTN = screen.getByRole('button', {
      name: /by ingredient/i,
    });
    userEvent.click(exploreByIngredientBTN);
    expect(history.location.pathname).toBe('/explore/foods/ingredients');
  });
  it(`expects that when you click on the BY NATIONALITY button you will
  be redirected to the EXPLORE FOODS BY NATIONALITY page`, async () => {
    const { history } = renderWithRouterAndRedux(<App />, ROUTE);
    const exploreByNationality = screen.getByRole('button', {
      name: /by nationality/i,
    });
    userEvent.click(exploreByNationality);
    expect(history.location.pathname).toBe('/explore/foods/nationalities');
  });
  it(`expects that when you click on the SURPRISE ME! button you will
  be redirected to A RANDOM FOODS page`, async () => {
    renderWithRouterAndRedux(<App />, { initialState,
      initialEntries: ['/explore/foods'] });
    const surpriseMeBTN = screen.getByRole('button', {
      name: /surprise me!/i,
    });
    expect(surpriseMeBTN).toBeInTheDocument();
    userEvent.click(surpriseMeBTN);
  });
});
