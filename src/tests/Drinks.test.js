import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './testHelpers/test-utils.jsx';
import Drinks from '../pages/Drinks';
import App from '../App';
import fetchRequest from '../../cypress/mocks/fetch';

describe('Testing page <Drinks.js>', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => fetchRequest(url));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`expect the header to contain the title, a search button and a
  profile button`, () => {
    renderWithRouterAndRedux(<Drinks />);
    const heading = screen.getByRole('heading', { name: /drinks/i });
    const profileBtn = screen.getByRole('img', { name: /profileicon/i });
    const showSearchBtn = screen.getByRole('img', { name: /searchicon/i });
    expect(heading).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(showSearchBtn).toBeInTheDocument();
  });
  it('Load the first 12 cocktail recipes, one on each card', async () => {
    renderWithRouterAndRedux(<Drinks />);
    const card0 = await screen.findByTestId('0-recipe-card');
    const card11 = await screen.findByTestId('11-recipe-card');

    expect(card0).toBeInTheDocument();
    expect(card11).toBeInTheDocument();
  });
  it(`
  Expect the following filter buttons to exist on the screen:
  Reset;
  All;
  Ordinary Drink;
  Cocktail;
  Milk / float / shake;
  Other/Unknown;
  Cocoa.`, () => {
    renderWithRouterAndRedux(<Drinks />);

    const resetBtn = screen.getByRole('button', { name: /reset/i });
    const allBtn = screen.getByRole('button', { name: /all/i });
    const ordinaryDrinkBtn = screen.getByRole('button', { name: /ordinary drink/i });
    const cocktailBtn = screen.getByRole('button', { name: /cocktail/i });
    const milkFloatShakeBtn = screen.getByRole('button', {
      name: /milk \/ float \/ shake/i,
    });
    const otherBtn = screen.getByRole('button', {
      name: /other\/unknown/i,
    });
    const cocoaBtn = screen.getByRole('button', {
      name: /cocoa/i,
    });

    expect(resetBtn).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(ordinaryDrinkBtn).toBeInTheDocument();
    expect(cocktailBtn).toBeInTheDocument();
    expect(milkFloatShakeBtn).toBeInTheDocument();
    expect(otherBtn).toBeInTheDocument();
    expect(cocoaBtn).toBeInTheDocument();
  });
  it('for the 747 drink card to appear when pressing the GOAT button', async () => {
    renderWithRouterAndRedux(<Drinks />);
    const cocktailBtn = screen.getByRole('button', { name: /cocktail/i });
    const allBtn = screen.getByRole('button', { name: /all/i });
    userEvent.click(cocktailBtn);
    const cocktail747 = await screen.findByText(/747 drink/i);
    expect(cocktail747).toBeInTheDocument();

    userEvent.click(allBtn);
    const ggCard = await screen.findByText(/gg/i);
    expect(ggCard).toBeInTheDocument();
  });
  it(`When clicking the search button for the first time the search bar appears
  When clicking the search button a second time the search bar disappears`, () => {
    renderWithRouterAndRedux(<Drinks />);
    const showSearchBtn = screen.getByRole('img', { name: /searchicon/i });

    userEvent.click(showSearchBtn);
    const searchBar = screen.getByRole('textbox');

    expect(searchBar).toBeInTheDocument();

    userEvent.click(showSearchBtn);

    expect(searchBar).not.toBeInTheDocument();
  });
  it(`when clicking an image card you should be redirect 
  to the drink details`, async () => {
    const ROUTE = { initialEntries: ['/drinks/'] };
    const { history } = renderWithRouterAndRedux(<App />, ROUTE);
    const corbaBtn = await screen.findByTestId('0-card-img');
    userEvent.click(corbaBtn);

    expect(history.location.pathname).toBe('/drinks/');
  });
  it('Expects to be able to search by First Name', () => {
    const ROUTE = { initialEntries: ['/drinks/'] };
    renderWithRouterAndRedux(<App />, ROUTE);

    const showSearchBtn = screen.getByRole('img', { name: /searchicon/i });
    userEvent.click(showSearchBtn);
    const nameRadio = screen.getByRole('radio', { name: /name/i });
    userEvent.click(nameRadio);

    const searchBtn = screen.getByTestId('exec-search-btn');

    userEvent.click(searchBtn);
  });
});
