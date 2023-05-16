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
  customerDataWithToken,
  registerCustomerData,
  registerPassword,
} from './mocks/login/customer.mock';

const BASE_URL = 'http://localhost:3000/';

const dataTestId = {
  name: 'common_register__input-name',
  email: 'common_register__input-email',
  password: 'common_register__input-password',
  registerBtn: 'common_register__button-register',
};
const REGISTER_ENDPOINT = '/register';

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

  test('não é possível registrar usuário existente', async () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    history.push(REGISTER_ENDPOINT);

    const inputName = screen.getByTestId(dataTestId.name);
    const inputEmail = screen.getByTestId(dataTestId.email);
    const inputPassword = screen.getByTestId(dataTestId.password);
    const buttonRegister = screen.getByTestId(dataTestId.registerBtn);
    const invalidAlert = screen.queryByText(/dados inválidos/i);

    expect(history.location.pathname).toBe(REGISTER_ENDPOINT);
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonRegister).toBeInTheDocument();
    expect(buttonRegister.disabled).toBe(true);
    expect(invalidAlert).not.toBeInTheDocument();

    userEvent.type(inputName, customerDataWithToken.name);
    expect(buttonRegister.disabled).toBe(true);

    userEvent.type(inputEmail, loginCustomerData.email);
    expect(buttonRegister.disabled).toBe(true);

    userEvent.type(inputPassword, loginCustomerData.password);
    expect(buttonRegister.disabled).toBe(false);

    act(() => {
      userEvent.click(buttonRegister);
    });

    await waitFor(async () => {
      const errorMSG = screen.getByTestId(
        'common_register__element-invalid_register',
      );
      expect(errorMSG).toBeInTheDocument();
    });
  });

  test('não é possível registrar com dados inválidos', async () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    history.push(REGISTER_ENDPOINT);

    const inputName = screen.getByTestId(dataTestId.name);
    const inputEmail = screen.getByTestId(dataTestId.email);
    const inputPassword = screen.getByTestId(dataTestId.password);
    const buttonRegister = screen.getByTestId(dataTestId.registerBtn);

    userEvent.type(inputName, 'abc');
    expect(buttonRegister.disabled).toBe(true);

    userEvent.type(inputEmail, 'invalidmail@com');
    expect(buttonRegister.disabled).toBe(true);

    userEvent.type(inputPassword, '123');
    expect(buttonRegister.disabled).toBe(true);
  });

  test('é possível registrar um novo usuário', async () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    const httpCreated = 204;

    mock.onPost(`${BASE_URL}/users/register`).reply(httpCreated, registerCustomerData);

    history.push(REGISTER_ENDPOINT);

    const inputName = screen.getByTestId(dataTestId.name);
    const inputEmail = screen.getByTestId(dataTestId.email);
    const inputPassword = screen.getByTestId(dataTestId.password);
    const registerBtn = screen.getByTestId(dataTestId.registerBtn);

    userEvent.type(inputName, registerCustomerData.name);
    expect(inputName.value).toBe(registerCustomerData.name);
    expect(registerBtn.disabled).toBe(true);

    userEvent.type(inputEmail, registerCustomerData.email);
    expect(inputEmail.value).toBe(registerCustomerData.email);
    expect(registerBtn.disabled).toBe(true);

    userEvent.type(inputPassword, registerPassword);
    expect(inputPassword.value).toBe(registerPassword);
    expect(registerBtn.disabled).toBe(false);

    userEvent.click(registerBtn);

    await waitFor(async () => {
      const productsBtn = await screen.queryByText(/produtos/i);

      expect(productsBtn).toBeInTheDocument();
      expect(history.location.pathname).toBe(NEW_ENDPOINT);
    });
  });
});
