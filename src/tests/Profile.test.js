import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './testHelpers/test-utils.jsx';

describe.only('Testing page <Profile.js>', () => {
  const ROUTE = { initialEntries: ['/profile'] };
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => fetchRequest(url));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('expects Profile to be present on the screen', () => {
    renderWithRouterAndRedux(<App />, ROUTE);
    const heading = screen.getByRole('heading', {
      name: /profile/i,
    });

    expect(heading).toBeInTheDocument();
  });
  it('expects the USER EMAIL to be present on the screen', () => {
    renderWithRouterAndRedux(<App />, ROUTE);

    const userEmail = screen.getByTestId('profile-email');
    expect(userEmail).toBeInTheDocument();
  });
  it(`Expect the button: 
  DONE RECIPES; FAVORITE RECIPES;  LOGOUT;
  to be present in the screen`, () => {
    renderWithRouterAndRedux(<App />, ROUTE);

    const doneBtn = screen.getByRole('button', {
      name: /done recipes/i,
    });
    const favoriteBtn = screen.getByRole('button', {
      name: /favorite recipes/i,
    });
    const logoutBtn = screen.getByRole('button', {
      name: /logout/i,
    });

    expect(doneBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });
  it(`expects that when you click on the DONE RECIPES button you will
  be redirected to the in-progress page`, async () => {
    const { history } = renderWithRouterAndRedux(<App />, ROUTE);
    const doneBtn = screen.getByRole('button', {
      name: /done recipes/i,
    });
    userEvent.click(doneBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  it(`expects that when you click on the FAVORITE RECIPES button you will
  be redirected to the FAVORITE-RECIPES page`, async () => {
    const { history } = renderWithRouterAndRedux(<App />, ROUTE);
    const favoriteBtn = screen.getByRole('button', {
      name: /favorite recipes/i,
    });
    userEvent.click(favoriteBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it(`expects that when you click on the LOGOUT button you will
  be redirected to the in-progress page`, async () => {
    const { history } = renderWithRouterAndRedux(<App />, ROUTE);
    const logoutBtn = screen.getByRole('button', {
      name: /logout/i,
    });
    userEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
  });
  it('baaa', async () => {
    const USER = { email: 'teste@teste.com' };
    localStorage.setItem('user', JSON.stringify(USER));
    renderWithRouterAndRedux(<App />, ROUTE);

    const userEmail = await screen.findByRole('heading', { name: /teste@teste\.com/i });
    expect(userEmail).toBeInTheDocument();
  });
});
