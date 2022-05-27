import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './testHelpers/test-utils.jsx';
import Login from '../pages/Login';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import App from '../App';

describe('Testing component <HEADER.js>', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => fetchRequest(url));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  const SEARCH_BUTTON = 'exec-search-btn';
  const ROUTE = { initialEntries: ['/foods'] };
  it('expects HEADER not to be present on login screen', () => {
    render(<Login />);
    const headerBTN = screen.queryByRole('img', { name: /searchicon/i });
    expect(headerBTN).not.toBeInTheDocument();
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
  it(`When clicking the search button the following buttons should appear:
  ingredient // Radio ;
  name // Radio;
  first Letter // Radio;
  search button // button`, () => {
    renderWithRouterAndRedux(<Foods />);
    const showSearchBtn = screen.getByRole('img', { name: /searchicon/i });

    userEvent.click(showSearchBtn);

    const ingredientRadio = screen.getByText(/ingredient/i);
    const nameRadio = screen.getByText(/name/i);
    const firstLetterRadio = screen.getByText(/first letter/i);
    const searchBtn = screen.getByTestId(SEARCH_BUTTON);

    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
  it('Search the food API if the person is on the FOODS page', () => {
    renderWithRouterAndRedux(<App />, ROUTE);
    const showSearchBtn = screen.getByRole('img', { name: /searchicon/i });
    userEvent.click(showSearchBtn);

    const ingredientRadio = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    const searchBtn = screen.getByTestId(SEARCH_BUTTON);
    const searchBar = screen.getByRole('textbox');

    fireEvent.change(searchBar, { target: { value: 'chicken' } });
    userEvent.click(ingredientRadio);
    userEvent.click(searchBtn);

    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });
  it('Search the cocktails API if the person is on the DRINKS page', () => {
    global.fetch.mockResolvedValue({});
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    renderWithRouterAndRedux(<Drinks />);
    const showSearchBtn = screen.getByRole('img', { name: /searchicon/i });
    userEvent.click(showSearchBtn);

    const ingredientRadio = screen.getByRole('radio', {
      name: /ingredient/i,
    });
    const searchBtn = screen.getByTestId(SEARCH_BUTTON);
    const searchBar = screen.getByRole('textbox');

    fireEvent.change(searchBar, { target: { value: 'lemon' } });

    userEvent.click(ingredientRadio);
    userEvent.click(searchBtn);

    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  });
  it(`
  Expect that when clicking on the PROFILE button
  you will be redirected to the /profile page`, () => {
    const { history } = renderWithRouterAndRedux(<Foods />);

    const profileBtn = screen.getByRole('img', { name: /profileicon/i });
    userEvent.click(profileBtn);

    expect(history.location.pathname).toBe('/profile');
  });
  it('Expects to be able to search by First Letter', () => {
    renderWithRouterAndRedux(<Foods />);

    const showSearchBtn = screen.getByRole('img', { name: /searchicon/i });
    userEvent.click(showSearchBtn);
    const firstLetterRadio = screen.getByRole('radio', { name: /first letter/i });
    userEvent.click(firstLetterRadio);

    const searchBtn = screen.getByTestId(SEARCH_BUTTON);

    userEvent.click(searchBtn);
  });
  it('Expects to be able to search by First Name', () => {
    renderWithRouterAndRedux(<Foods />);

    const showSearchBtn = screen.getByRole('img', { name: /searchicon/i });
    userEvent.click(showSearchBtn);
    const nameRadio = screen.getByRole('radio', { name: /name/i });
    userEvent.click(nameRadio);

    const searchBtn = screen.getByTestId(SEARCH_BUTTON);

    userEvent.click(searchBtn);
  });
});
