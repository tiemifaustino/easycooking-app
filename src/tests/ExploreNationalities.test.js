import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './testHelpers/test-utils.jsx';
import fetchRequest from '../../cypress/mocks/fetch';

describe('Testing page <EXPLORE NATIONALITY.js>', () => {
  const ROUTE = { initialEntries: ['/explore/foods/nationalities'] };
  const initialState = { recipeListAreaReducer: { recipeArea: [
    {
      strArea: 'American',
    },
    {
      strArea: 'British',
    },
    {
      strArea: 'Canadian',
    },
    {
      strArea: 'Chinese',
    },
    {
      strArea: 'Croatian',
    },
    {
      strArea: 'Dutch',
    },
    {
      strArea: 'Egyptian',
    },
    {
      strArea: 'French',
    },
    {
      strArea: 'Greek',
    },
    {
      strArea: 'Indian',
    },
    {
      strArea: 'Irish',
    },
    {
      strArea: 'Italian',
    },
    {
      strArea: 'Jamaican',
    },
    {
      strArea: 'Japanese',
    },
    {
      strArea: 'Kenyan',
    },
    {
      strArea: 'Malaysian',
    },
    {
      strArea: 'Mexican',
    },
    {
      strArea: 'Moroccan',
    },
    {
      strArea: 'Polish',
    },
    {
      strArea: 'Portuguese',
    },
    {
      strArea: 'Russian',
    },
    {
      strArea: 'Spanish',
    },
    {
      strArea: 'Thai',
    },
    {
      strArea: 'Tunisian',
    },
    {
      strArea: 'Turkish',
    },
    {
      strArea: 'Unknown',
    },
    {
      strArea: 'Vietnamese',
    },
  ] } };
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url) => fetchRequest(url));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it(`expects EXPLORE  NATIONALITIES heading to be present 
  on the EXPLORE NATIONALITIES FOODS PAGE`, () => {
    renderWithRouterAndRedux(<App />, ROUTE);
    const heading = screen.getByRole('heading', {
      name: /explore Nationalities/i,
    });

    expect(heading).toBeInTheDocument();
  });
  it(`expects a dropdown with the data test-id: 
  "explore-by-nationality-dropdown" `, async () => {
    renderWithRouterAndRedux(<App />,
      { initialState, initialEntries: ['/explore/foods/nationalities'] });
    const dropDown = await screen.findByTestId('explore-by-nationality-dropdown');
    const NUMBER_OF_OPTIONS = 25;
    expect(dropDown).toBeInTheDocument();
    const option = await screen.findAllByTestId(/option/i);
    expect(option.length).toBe(NUMBER_OF_OPTIONS);
    userEvent.selectOptions(dropDown, 'British');
  });
});
