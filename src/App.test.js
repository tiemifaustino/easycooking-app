import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { reduce } from 'lodash';

test('Farewell, front-end', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/TRYBE/i);
  expect(linkElement).toBeInTheDocument();
});
