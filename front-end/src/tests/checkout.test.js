import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from '../App';
import AppProvider from '../context/AppProvider';
import renderWithRouter from '../utils/renderWithRouter';
import {
  loginCustomerData,
} from './mocks/login/customer.mock';

const dataTestId = {
  email: 'common_login__input-email',
  password: 'common_login__input-password',
  loginBtn: 'common_login__button-login',
  cartTotal: 'customer_products__checkout-bottom-value',
  createOrderBtn: 'customer_checkout__button-submit-order',
};

describe('Checkout page', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
    localStorage.clear();
  });

  test(
    'todos os elementos são renderizados na tela',
    async () => {
      renderWithRouter(
        <AppProvider>
          <App />
        </AppProvider>,
      );

      const inputEmail = screen.getByTestId(dataTestId.email);
      const inputPassword = screen.getByTestId(dataTestId.password);
      const buttonLogin = screen.getByTestId(dataTestId.loginBtn);

      userEvent.type(inputEmail, loginCustomerData.email);
      userEvent.type(inputPassword, loginCustomerData.password);
      userEvent.click(buttonLogin);

      await waitForElementToBeRemoved(inputEmail);

      const cartTotal = screen
        .getByTestId(dataTestId.cartTotal);
      expect(cartTotal).toBeInTheDocument();

      const plusBtn1 = await screen
        .findByTestId('customer_products__button-card-add-item-1');

      const plusBtn2 = await screen
        .findByTestId('customer_products__button-card-add-item-2');

      userEvent.dblClick(plusBtn1);

      userEvent.click(plusBtn2);

      const cartSum = await screen
        .findByTestId(dataTestId.cartTotal);

      expect(cartSum.innerHTML).toBe('11,90');

      userEvent.click(cartSum);

      // await waitForElementToBeRemoved(cartSum);

      const finishBtn = await screen
        .findByTestId(dataTestId.createOrderBtn);

      expect(finishBtn).toBeInTheDocument();
    },
  );
});
