import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
import renderWithReduxAndRouter from './testHelpers/test-utils.jsx';
import Login from '../pages/Login';
// import { render, fireEvent, screen } from './testHelpers/test-utils.jsx';

describe('Testing page <Login.js>', () => {
  it(`expects the page to contain a "HEADING" with the text value 
  equal to "Login"`, () => {
    render(<Login />);
    const heading = screen.getByRole('heading', { name: /login/i });
    expect(heading).toBeInTheDocument();
  });
  it(`expects the page to contain an 'INPUT' of type 'PASSWORD' with 
  placeholder value equal to 'PASSWORD'`, () => {
    render(<Login />);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
  it(`expects the page to contain an 'INPUT' of type 'PASSWORD' with 
  placeholder value equal to 'Email'`, () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    expect(emailInput).toHaveAttribute('type', 'email');
  });
  it(`Expect the enter "BUTTON" to be ENABLED only if a valid e-mail address and 
  a password of at least 7 characters have been typed`, () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const enterBtn = screen.getByRole('button', { name: /enter/i });

    expect(enterBtn).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    expect(enterBtn).toBeDisabled();

    fireEvent.change(passwordInput, { target: { value: '0123456789' } });
    expect(enterBtn).toBeEnabled();

    fireEvent.change(passwordInput, { target: { value: '123456' } });
    expect(enterBtn).toBeDisabled();

    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    fireEvent.change(emailInput, { target: { value: 'testtest.com' } });
    expect(enterBtn).toBeDisabled();
  });

  it('espera que qnd clicado seja ', () => {
    const { history } = renderWithReduxAndRouter(<Login />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const enterBtn = screen.getByRole('button', { name: /enter/i });

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: '0123456789' } });

    userEvent.click(enterBtn);
    expect(history.location.pathname).toBe('/foods');
  });
});
