import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './testHelpers/test-utils.jsx';

describe.only('Testing page <Explore.js>', () => {
  const ROUTE = { initialEntries: ['/explore'] };
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => fetchRequest(url));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('expects EXPLORE to be present on the screen', () => {
    renderWithRouterAndRedux(<App />, ROUTE);
    const heading = screen.getByRole('heading', {
      name: /explore/i,
    });

    expect(heading).toBeInTheDocument();
  });
  it(`expects that when you click on the EXPLORE FOODS button you will
  be redirected to the EXPLORE FOODS page`, async () => {
    const { history } = renderWithRouterAndRedux(<App />, ROUTE);
    const exploreFoodsBTN = screen.getByRole('button', {
      name: /explore foods/i,
    });
    userEvent.click(exploreFoodsBTN);
    expect(history.location.pathname).toBe('/explore/foods');
  });
  it(`expects that when you click on the EXPLORE DRINKS button you will
  be redirected to the EXPLORE DRINKS page`, async () => {
    const { history } = renderWithRouterAndRedux(<App />, ROUTE);
    const exploreDrinksBTN = screen.getByRole('button', {
      name: /explore drinks/i,
    });
    userEvent.click(exploreDrinksBTN);
    expect(history.location.pathname).toBe('/explore/drinks');
  });
});
