import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('Testing page <NotFOund.js>', () => {
  it('The page should containg a heading', () => {
    render(<NotFound />);
    const heading = screen.getByRole('heading', {
      name: /not found/i,
    });
    expect(heading).toBeInTheDocument();
  });
  it('The page should countaing a NOT FOUND IMAGE', () => {
    render(<NotFound />);
    const NotFoundImage = screen.getByRole('img', {
      name: /empty pantry/i,
    });
    expect(NotFoundImage).toBeInTheDocument();
  });
});
