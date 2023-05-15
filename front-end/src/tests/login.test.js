import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from '../App';
import AppProvider from '../context/AppProvider';
import renderWithRouter from '../utils/renderWithRouter';
import {
  loginCustomerData,
  notRegistredUser,
  invalidDataResponse,
} from './mocks/login/login.mock';

const BASE_URL = 'http://localhost:3000/';

const dataTestId = {
  email: 'common_login__input-email',
  password: 'common_login__input-password',
  loginBtn: 'common_login__button-login',
  registerLink: 'common_login__button-register',
};

const NEW_ENDPOINT = '/customer/products';

describe('Login page', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
    localStorage.clear();
  });

  test('login form is rende', async () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    const inputEmail = screen.getByTestId(dataTestId.email);
    const inputPassword = screen.getByTestId(dataTestId.password);
    const buttonLogin = screen.getByTestId(dataTestId.loginBtn);
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

    const inputEmail = screen.getByTestId(dataTestId.email);
    const inputPassword = screen.getByTestId(dataTestId.password);
    const buttonLogin = screen.getByTestId(dataTestId.loginBtn);

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
      expect(history.location.pathname).toBe(NEW_ENDPOINT);
    });
  });

  test('exibe mensagem de erro ao lançar dados inexistentes', async () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    expect(history.location.pathname).toBe('/login');

    mock.onPost(`${BASE_URL}/login`).reply(invalidDataResponse);

    const inputEmail = screen.getByTestId(dataTestId.email);
    const inputPassword = screen.getByTestId(dataTestId.password);
    const buttonLogin = screen.getByTestId(dataTestId.loginBtn);

    userEvent.type(inputEmail, notRegistredUser.email);

    expect(inputEmail.value).toBe(notRegistredUser.email);
    expect(buttonLogin).toBeDisabled();

    userEvent.type(inputPassword, notRegistredUser.password);

    expect(buttonLogin).not.toBeDisabled();

    act(() => {
      userEvent.click(buttonLogin);
    });

    await waitFor(async () => {
      const errorMSG = screen.getByText('Dados Inválidos');

      expect(errorMSG).toBeInTheDocument();
    });
  });

  test('contém link para a página de cadastro', async () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    const registerLink = screen.getByTestId(dataTestId.registerLink);

    expect(registerLink).toBeInTheDocument();

    act(() => {
      userEvent.click(registerLink);
    });

    expect(history.location.pathname).toBe('/register');
  });
});
