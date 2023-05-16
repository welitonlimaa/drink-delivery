import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from '../App';
import { adminLoginData, newSellerData } from './mocks/adminMock';
import AppProvider from '../context/AppProvider';
import renderWithRouter from '../utils/renderWithRouter';

const dataTestId = {
  email: 'common_login__input-email',
  password: 'common_login__input-password',
  loginBtn: 'common_login__button-login',
  registerName: 'admin_manage__input-name',
  registerEmail: 'admin_manage__input-email',
  registerPassword: 'admin_manage__input-password',
  registerSelect: 'admin_manage__select-role',
  registerButton: 'admin_manage__button-register',
  newUserTestId: 'admin_manage__element-user-table-item-number-3',
  buttonRemove: 'admin_manage__element-user-table-remove-3',
};

describe('Admin page', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
    localStorage.clear();
  });

  test('if route /admin/manage render admin page', async () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    const inputEmail = screen.getByTestId(dataTestId.email);
    const inputPassword = screen.getByTestId(dataTestId.password);
    const buttonLogin = screen.getByTestId(dataTestId.loginBtn);

    userEvent.type(inputEmail, adminLoginData.email);
    userEvent.type(inputPassword, adminLoginData.password);
    expect(buttonLogin.disabled).toBe(false);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      expect(history.location.pathname).toEqual('/admin/manage');
    });
  });

  test('header admin page', async () => {
    renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    const inputEmail = screen.getByTestId(dataTestId.email);
    const inputPassword = screen.getByTestId(dataTestId.password);
    const buttonLogin = screen.getByTestId(dataTestId.loginBtn);

    userEvent.type(inputEmail, adminLoginData.email);
    userEvent.type(inputPassword, adminLoginData.password);
    expect(buttonLogin.disabled).toBe(false);
    userEvent.click(buttonLogin);

    await waitForElementToBeRemoved(inputEmail);

    const link = await screen
      .findByTestId('customer_products__element-navbar-link-orders');

    expect(link.innerHTML).toEqual('Gerênciar usuários');
  });

  test('register form admin page', async () => {
    renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    const inputEmail = screen.getByTestId(dataTestId.email);
    const inputPassword = screen.getByTestId(dataTestId.password);
    const buttonLogin = screen.getByTestId(dataTestId.loginBtn);

    userEvent.type(inputEmail, adminLoginData.email);
    userEvent.type(inputPassword, adminLoginData.password);
    expect(buttonLogin.disabled).toBe(false);
    userEvent.click(buttonLogin);

    await waitForElementToBeRemoved(inputEmail);

    const inputNameRegister = screen.getByTestId(dataTestId.registerName);
    const inputEmailRegister = screen.getByTestId(dataTestId.registerEmail);
    const inputPasswordRegister = screen.getByTestId(dataTestId.registerPassword);
    const selectRoleRegister = screen.getByTestId(dataTestId.registerSelect);
    const buttonRegister = screen.getByTestId(dataTestId.registerButton);

    expect(inputNameRegister).toBeInTheDocument();
    expect(inputEmailRegister).toBeInTheDocument();
    expect(inputPasswordRegister).toBeInTheDocument();
    expect(selectRoleRegister).toBeInTheDocument();
    expect(buttonRegister).toBeInTheDocument();

    userEvent.type(inputNameRegister, newSellerData.name);
    userEvent.type(inputEmailRegister, newSellerData.email);
    userEvent.type(inputPasswordRegister, newSellerData.password);
    userEvent.selectOptions(selectRoleRegister, newSellerData.role);

    expect(buttonRegister.disabled).toBe(false);

    userEvent.click(buttonRegister);

    const newUser = await screen
      .findByTestId(dataTestId.newUserTestId);

    expect(newUser).toBeInTheDocument();
  });

  test('remove user in admin page', async () => {
    renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    const inputEmail = screen.getByTestId(dataTestId.email);
    const inputPassword = screen.getByTestId(dataTestId.password);
    const buttonLogin = screen.getByTestId(dataTestId.loginBtn);

    userEvent.type(inputEmail, adminLoginData.email);
    userEvent.type(inputPassword, adminLoginData.password);
    expect(buttonLogin.disabled).toBe(false);
    userEvent.click(buttonLogin);

    await waitForElementToBeRemoved(inputEmail);

    const newUser = await screen
      .findByTestId(dataTestId.newUserTestId);

    expect(newUser).toBeInTheDocument();

    const buttonRemove = screen
      .getByTestId(dataTestId.buttonRemove);
    console.log(buttonRemove);
    userEvent.click(buttonRemove);

    await waitForElementToBeRemoved(newUser);

    expect(newUser).not.toBeInTheDocument();
  });
});
