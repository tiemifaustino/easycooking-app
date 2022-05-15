import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './testHelpers/test-utils.jsx';

describe.only('Testing page <ExploreFoods.js>', () => {
  const ROUTE = { initialEntries: ['/explore/drinks'] };
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => fetchRequest(url));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('expects EXPLORE  DRINKS heading to be present on the screen', () => {
    renderWithRouterAndRedux(<App />, ROUTE);
    const heading = screen.getByRole('heading', {
      name: /explore drinks/i,
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
    expect(history.location.pathname).toBe('/explore/drinks/ingredients');
  });

  it(`expects that when you click on the SURPRISE ME! button you will
  be redirected to A RANDOM DRINKS page`, async () => {
    renderWithRouterAndRedux(<App />, ROUTE);
    const surpriseMeBTN = screen.getByRole('button', {
      name: /surprise me!/i,
    });
    expect(surpriseMeBTN).toBeInTheDocument();
  });
});
