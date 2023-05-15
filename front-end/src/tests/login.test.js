import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from '../App';
import { loginCustomerData } from './mocks/usersMock';
import AppProvider from '../context/AppProvider';
import renderWithRouter from '../utils/renderWithRouter';

const BASE_URL = 'http://localhost:3000/';

describe('Login page', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

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

    mock
      .onPost(`${BASE_URL}/login`)
      .reply(loginCustomerData.customerDataWithToken);

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

    await waitFor(async () => {
      const productsBtn = await screen.queryByText(/produtos/i);

      expect(productsBtn).toBeInTheDocument();
      expect(history.location.pathname).toBe('/customer/products');
    });
  });
});
