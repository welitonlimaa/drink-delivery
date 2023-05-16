import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from '../App';
import AppProvider from '../context/AppProvider';
import renderWithRouter from '../utils/renderWithRouter';
import dataSellerLogin from './mocks/login/seller.mock';

const dataTestId = {
  email: 'common_login__input-email',
  password: 'common_login__input-password',
  loginBtn: 'common_login__button-login',
};

describe('Seller Orders page', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
    localStorage.clear();
  });

  test(
    'as ordens são renderizadas',
    async () => {
      const { history } = renderWithRouter(
        <AppProvider>
          <App />
        </AppProvider>,
      );

      const inputEmail = screen.getByTestId(dataTestId.email);
      const inputPassword = screen.getByTestId(dataTestId.password);
      const buttonLogin = screen.getByTestId(dataTestId.loginBtn);
      userEvent.type(inputEmail, dataSellerLogin.email);
      userEvent.type(inputPassword, dataSellerLogin.password);
      userEvent.click(buttonLogin);

      await waitForElementToBeRemoved(inputEmail);

      expect(history.location.pathname).toBe('/seller/orders');

      const link = await screen
        .findByTestId('customer_products__element-navbar-link-orders');

      expect(link.innerHTML).toEqual('Pedidos');
    },
  );

  test(
    'as ordens são renderizadas',
    async () => {
      const { history } = renderWithRouter(
        <AppProvider>
          <App />
        </AppProvider>,
      );

      const inputEmail = screen.getByTestId(dataTestId.email);
      const inputPassword = screen.getByTestId(dataTestId.password);
      const buttonLogin = screen.getByTestId(dataTestId.loginBtn);
      userEvent.type(inputEmail, dataSellerLogin.email);
      userEvent.type(inputPassword, dataSellerLogin.password);
      userEvent.click(buttonLogin);

      await waitForElementToBeRemoved(inputEmail);

      expect(history.location.pathname).toBe('/seller/orders');

      const firstOrder = await screen.findByTestId('seller_orders__element-order-id-1');
      expect(firstOrder).toBeInTheDocument();

      userEvent.click(firstOrder);

      const loading = await screen.findByText('Loading...');

      await waitForElementToBeRemoved(loading);

      expect(history.location.pathname).toBe('/seller/orders/1');
    },
  );
});
