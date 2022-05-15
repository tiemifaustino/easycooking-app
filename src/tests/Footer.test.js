import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './testHelpers/test-utils.jsx';
import Login from '../pages/Login';
import App from '../App';

describe('Testing component <HEADER.js>', () => {
  const ROUTE = { initialEntries: ['/foods'] };
  const DRINKS_ROUTE = { initialEntries: ['/drinks'] };

  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => fetchRequest(url));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('expects HEADER not to be present on login screen', () => {
    renderWithRouterAndRedux(<Login />);
    const headerBTN = screen.queryByRole('img', { name: /searchicon/i });
    expect(headerBTN).not.toBeInTheDocument();
  });
  it(`Expects the footer to contain the following buttons:
  drinks;
  explore;
  foods;`, () => {
    renderWithRouterAndRedux(<App />, ROUTE);
    const drinksBTN = screen.getByRole('img', { name: /drinkicon/i });
    const exploreBTN = screen.getByRole('img', {
      name: /exploreicon/i,
    });
    const foodsBTN = screen.getByRole('img', { name: /mealicon/i });
    expect(drinksBTN).toBeInTheDocument();
    expect(exploreBTN).toBeInTheDocument();
    expect(foodsBTN).toBeInTheDocument();
  });
  it('drinks button should redirect to the drinks page', () => {
    const { history } = renderWithRouterAndRedux(<App />, ROUTE);
    const drinksBTN = screen.getByRole('button', { name: /drinkicon/i });
    userEvent.click(drinksBTN);
    expect(history.location.pathname).toBe('/drinks');
  });
  it('foods button should redirect to the foods page', () => {
    const { history } = renderWithRouterAndRedux(<App />, DRINKS_ROUTE);
    const mealsBtn = screen.getByRole('button', { name: /mealicon/i });
    userEvent.click(mealsBtn);
    expect(history.location.pathname).toBe('/foods');
  });
  it('explore button should redirect to the explore page', () => {
    const { history } = renderWithRouterAndRedux(<App />, ROUTE);
    const exploreBtn = screen.getByRole('button', {
      name: /exploreicon/i,
    });
    userEvent.click(exploreBtn);
    expect(history.location.pathname).toBe('/explore');
  });
});
