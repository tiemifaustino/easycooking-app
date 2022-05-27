import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './testHelpers/test-utils.jsx';
import Foods from '../pages/Foods';
import App from '../App';
import fetchRequest from '../../cypress/mocks/fetch';

describe('Testing page <Foods.js>', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => fetchRequest(url));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`expect the header to contain the title, a search button and a
  profile button`, () => {
    renderWithRouterAndRedux(<Foods />);
    const heading = screen.getByRole('heading', { name: /foods/i });
    const profileBtn = screen.getByRole('img', { name: /profileicon/i });
    const showSearchBtn = screen.getByRole('img', { name: /searchicon/i });
    expect(heading).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(showSearchBtn).toBeInTheDocument();
  });
  it('Load the first 12 food recipes, one on each card', async () => {
    renderWithRouterAndRedux(<Foods />);
    const card0 = await screen.findByTestId('0-recipe-card');
    const card11 = await screen.findByTestId('11-recipe-card');

    expect(card0).toBeInTheDocument();
    expect(card11).toBeInTheDocument();
  });
  it(`
  Expect the following filter buttons to exist on the screen:
  reset;
  all;
  beef;
  breakfast;
  chicken;
  desert;
  goat.`, () => {
    renderWithRouterAndRedux(<Foods />);

    const resetBtn = screen.getByRole('button', { name: /reset/i });
    const allBtn = screen.getByRole('button', { name: /all/i });
    const beefBtn = screen.getByRole('button', { name: /beef/i });
    const breakfastBtn = screen.getByRole('button', { name: /breakfast/i });
    const chickenBtn = screen.getByRole('button', { name: /chicken/i });
    const dessertBtn = screen.getByRole('button', { name: /dessert/i });
    const goatBtn = screen.getByRole('button', { name: /goat/i });

    expect(resetBtn).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(beefBtn).toBeInTheDocument();
    expect(breakfastBtn).toBeInTheDocument();
    expect(chickenBtn).toBeInTheDocument();
    expect(dessertBtn).toBeInTheDocument();
    expect(goatBtn).toBeInTheDocument();
  });
  it('for the corba card to appear when pressing the GOAT button', async () => {
    renderWithRouterAndRedux(<Foods />);
    const goatBtn = screen.getByRole('button', { name: /goat/i });
    const allBtn = screen.getByRole('button', { name: /all/i });
    userEvent.click(goatBtn);
    const roastedGoatCard = await screen.findByText(/mbuzi choma \(roasted goat\)/i);
    expect(roastedGoatCard).toBeInTheDocument();

    userEvent.click(allBtn);
    const corbaCard = await screen.findByText(/corba/i);
    expect(corbaCard).toBeInTheDocument();
  });
  it(`When clicking the search button for the first time the search bar appears
  When clicking the search button a second time the search bar disappears`, () => {
    renderWithRouterAndRedux(<Foods />);
    const showSearchBtn = screen.getByRole('img', { name: /searchicon/i });

    userEvent.click(showSearchBtn);
    const searchBar = screen.getByRole('textbox');

    expect(searchBar).toBeInTheDocument();

    userEvent.click(showSearchBtn);

    expect(searchBar).not.toBeInTheDocument();
  });

  it(`when clicking an image card you should be redirect 
  to the drink details page`, async () => {
    const ROUTE = { initialEntries: ['/foods/'] };
    const { history } = renderWithRouterAndRedux(<App />, ROUTE);
    const corbaBtn = await screen.findByRole('img', {
      name: /corba/i,
    });
    userEvent.click(corbaBtn);

    expect(history.location.pathname).toBe('/foods/');
  });
  it('Expects to be able to search by First Name', () => {
    renderWithRouterAndRedux(<Foods />);

    const showSearchBtn = screen.getByRole('img', { name: /searchicon/i });
    userEvent.click(showSearchBtn);
    const nameRadio = screen.getByRole('radio', { name: /name/i });
    userEvent.click(nameRadio);

    const searchBtn = screen.getByTestId('exec-search-btn');

    userEvent.click(searchBtn);
  });
});
