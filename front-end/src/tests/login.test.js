import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { isExpired } from 'react-jwt';
import axios from 'axios';
import App from '../App';
import { loginCustomerData } from './mocks/usersMock';
import AppProvider from '../context/AppProvider';
import renderWithRouter from '../utils/renderWithRouter';
import { requestLogin } from '../services/requests';

jest.mock('axios');

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
    const invalidAlert = screen.queryByText(/dados inválidos/i);

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

  test('realiza login com sucesso', async () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    axios.post.mockResolvedValueOnce(loginCustomerData.customerDataWithToken);

    const inputEmail = screen.getByTestId('common_login__input-email');
    const inputPassword = screen.getByTestId('common_login__input-password');
    const buttonLogin = screen.getByTestId('common_login__button-login');

    userEvent.type(inputEmail, loginCustomerData.email);

    expect(inputEmail.value).toBe(loginCustomerData.email);
    expect(buttonLogin).toBeDisabled();

    userEvent.type(inputPassword, loginCustomerData.password);

    expect(buttonLogin).not.toBeDisabled();

    act(() => {
      userEvent.click(buttonLogin);
    });

    const productsBtn = await screen.queryByText(/produtos/i);

    // expect(productsBtn).toBeInTheDocument();
    expect(history.location.pathname).toBe('/customer/products');
  });
});
