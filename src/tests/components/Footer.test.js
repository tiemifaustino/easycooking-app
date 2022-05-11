import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from '../testHelpers/test-utils.jsx';
import Login from '../../pages/Login';
import Foods from '../../pages/Foods';

describe('Testing component <HEADER.js>', () => {
  it('expects HEADER not to be present on login screen', () => {
    renderWithRouterAndRedux(<Login />);
    const headerBTN = screen.queryByRole('img', { name: /searchicon/i });
    expect(headerBTN).not.toBeInTheDocument();
  });
  it(`
  Expect the footer to contain the following buttons:
  drinks;
  explore;
  foods;`, () => {
    renderWithRouterAndRedux(<Foods />);
    const drinksBTN = screen.getByRole('img', { name: /drinkicon/i });
    const exploreBTN = screen.getByRole('img', {
      name: /exploreicon/i,
    });
    const foodsBTN = screen.getByRole('img', { name: /mealicon/i });
    expect(drinksBTN).toBeInTheDocument();
    expect(exploreBTN).toBeInTheDocument();
    expect(foodsBTN).toBeInTheDocument();
  });
});
