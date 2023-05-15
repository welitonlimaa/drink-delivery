import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { loginCustomerData } from './mocks/usersMock';
import AppProvider from '../context/AppProvider';
import renderWithRouter from '../utils/renderWithRouter';

describe('Login page', () => {
  test('login form is rende', async () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    const inputEmail = screen.getByTestId('common_login__input-email');
    const inputPassword = screen.getByTestId('common_login__input-password');
    const buttonLogin = screen.getByTestId('common_login__button-login');
    const invalidAlert = screen.getByTestId('common_login__element-invalid-email');

    expect(history.location.pathname).toBe('/login');
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();
    expect(invalidAlert).not.toBeInTheDocument();

    expect(buttonLogin.disabled).toBe(true);

    userEvent.type(inputEmail, loginCustomerData.email);
    userEvent.type(inputPassword, loginCustomerData.password);
    expect(buttonLogin.disabled).toBe(false);
  });

  test('realiza login com sucesso', () => {
    renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    const inputEmail = screen.getByTestId('common_login__input-email');
    const inputPassword = screen.getByTestId('common_login__input-password');
    const buttonLogin = screen.getByTestId('common_login__button-login');

    expect(inputEmail.value).toBe('');
    userEvent.type(inputEmail, loginCustomerData.email);
    expect(inputEmail.value).toBe(loginCustomerData.email);
  });
});
