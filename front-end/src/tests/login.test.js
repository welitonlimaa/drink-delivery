import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { loginCustomerData } from './mocks/usersMock';
import AppProvider from '../context/AppProvider';
import renderWithRouter from '../utils/renderWithRouter';

describe('Login page', () => {
  test('login form is rende', () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    const inputEmail = screen.getByTestId('common_login__input-email');
    const inputPassword = screen.getByTestId('common_login__input-password');
    const buttonLogin = screen.getByTestId('common_login__button-login');

    expect(history.location.pathname).toBe('/login');
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();

    expect(buttonLogin.disabled).toBe(true);

    userEvent.type(inputEmail, loginCustomerData.email);
    userEvent.type(inputPassword, loginCustomerData.password);
    expect(buttonLogin.disabled).toBe(false);
  });
});
