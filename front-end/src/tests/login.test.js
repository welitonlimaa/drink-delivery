import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import AppContext from '../context/AppContext';
import { loginCustomerData } from './mocks/usersMock';

describe('Login page', () => {
  test('login form is rende', () => {
    render(
      <AppContext>
        <App />
      </AppContext>,
    );

    const inputEmail = screen.getByTestId('common_login__input-email');
    const inputPassword = screen.getByTestId('common_login__input-password');
    const buttonLogin = screen.getByTestId('common_login__button-login');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();

    expect(buttonLogin.disabled).toBe(true);

    userEvent.type(inputEmail, loginCustomerData.email);
    userEvent.type(inputPassword, loginCustomerData.password);
    expect(buttonLogin.disabled).toBe(false);
  });
});
