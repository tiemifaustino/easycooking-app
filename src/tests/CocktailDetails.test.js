import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './testHelpers/test-utils.jsx';
import App from '../App';
import fetchRequest from '../../cypress/mocks/fetch';
import SimpleSliderRecipes from '../components/SimpleSliderRecipes';

describe('Testing page <CocktailsDetails.js>', () => {
  const recommendedCards = [{
    dateModified: '2016-07-18 22:06:00',
    idMeal: '52977',
    strAlcoholic: 'Optional alcohol',
    strCategory: 'Side',
    strMeal: 'Corba',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  }];
  const ROUTE = { initialEntries: ['/drinks/178319'] };
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => fetchRequest(url));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('expect the page to have the cocktail thumbnail image', async () => {
    renderWithRouterAndRedux(<App />, ROUTE);
    const thumbnail = await screen.findByRole('img',
      { name: /cocktail thumbnail/i });
    expect(thumbnail).toBeInTheDocument();
  });
  it('expect the page to have the cocktail title', async () => {
    renderWithRouterAndRedux(<App />, ROUTE);
    const heading = await screen.findByRole('heading',
      { name: /aquamarine/i });
    expect(heading).toBeInTheDocument();
  });
  it('expect the page to have the cocktail category', async () => {
    renderWithRouterAndRedux(<App />, ROUTE);
    const category = await screen.findByText(/alcoholic/i);
    expect(category).toBeInTheDocument();
  });
  it('expect the page to have the share button', async () => {
    renderWithRouterAndRedux(<App />, ROUTE);
    const shareBtn = await screen.findByRole('img', { name: /shareicon/i });
    expect(shareBtn).toBeInTheDocument();
  });
  it('expect the page to have the favorite button', async () => {
    renderWithRouterAndRedux(<App />, ROUTE);
    const favBtn = await screen.findByRole('button', { name: /favorite/i });
    expect(favBtn).toBeInTheDocument();
  });
  it(`expects that when you click on the START RECIPE button you will
   be redirected to the in-progress page`, async () => {
    const { history } = renderWithRouterAndRedux(<App />, ROUTE);
    const recipeBtn = await screen.findByRole('button', { name: /start recipe/i });
    userEvent.click(recipeBtn);
    expect(history.location.pathname).toBe('/drinks/178319/in-progress');
  });
  it('expects the carroussel to be working', async () => {
    renderWithRouterAndRedux(<SimpleSliderRecipes
      recommendedCards={ recommendedCards }
    />, ROUTE);
    const teste = await screen.findByRole('img', { name: /corba thumbnail/i });
    userEvent.click(teste);
  });
});
