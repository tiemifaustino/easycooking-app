import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
import renderWithRouterAndRedux from './testHelpers/test-utils.jsx';
import Login from '../pages/Login';
// import { render, fireEvent, screen } from './testHelpers/test-utils.jsx';

describe('Testing page <Login.js>', () => {
  const USER_INPUT = 'test@test.com';
  const PASSWORD_INPUT = '0123456789';

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

    fireEvent.change(emailInput, { target: { value: USER_INPUT } });
    expect(enterBtn).toBeDisabled();

    fireEvent.change(passwordInput, { target: { value: PASSWORD_INPUT } });
    expect(enterBtn).toBeEnabled();

    fireEvent.change(passwordInput, { target: { value: '123456' } });
    expect(enterBtn).toBeDisabled();

    fireEvent.change(passwordInput, { target: { value: PASSWORD_INPUT } });
    fireEvent.change(emailInput, { target: { value: 'testtest.com' } });
    expect(enterBtn).toBeDisabled();
  });

  it(`Redirect the user to the main food recipes screen after successful login
  submission and validation`, () => {
    const { history } = renderWithRouterAndRedux(<Login />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const enterBtn = screen.getByRole('button', { name: /enter/i });

    fireEvent.change(emailInput, { target: { value: USER_INPUT } });
    fireEvent.change(passwordInput, { target: { value: PASSWORD_INPUT } });

    userEvent.click(enterBtn);
    expect(history.location.pathname).toBe('/foods');
  });
  it(` Expect that by clicking on the button the ''Email'' key will be sent to 
  LOCALSTORAGE in the following format "{"email":"test@test.com"}"`, () => {
    const USER_IN_LOCAL_STORAGE = '{"email":"test@test.com"}';
    const TOKEN = '1';

    renderWithRouterAndRedux(<Login />);

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const enterBtn = screen.getByRole('button', { name: /enter/i });

    fireEvent.change(emailInput, { target: { value: USER_INPUT } });
    fireEvent.change(passwordInput, { target: { value: PASSWORD_INPUT } });

    userEvent.click(enterBtn);
    expect(window.localStorage.getItem('user')).toEqual(USER_IN_LOCAL_STORAGE);
    expect(window.localStorage.getItem('mealsToken')).toEqual(TOKEN);
    expect(window.localStorage.getItem('cocktailsToken')).toEqual(TOKEN);
  });
});
