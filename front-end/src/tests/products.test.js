import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from '../App';
import AppProvider from '../context/AppProvider';
import renderWithRouter from '../utils/renderWithRouter';
import {
  loginCustomerData,
  // customerDataWithToken,
  // registerCustomerData,
  // registerPassword,
} from './mocks/login/customer.mock';

const dataTestId = {
  email: 'common_login__input-email',
  password: 'common_login__input-password',
  loginBtn: 'common_login__button-login',
  cardImg: 'customer_products__img-card-bg-image-1',
  cardTitle: 'customer_products__element-card-title-1',
  cardPrice: 'customer_products__element-card-price-1',
  minusBtn: 'customer_products__button-card-rm-item-1',
  plusBtn: 'customer_products__button-card-add-item-1',
  cardQuantity: 'customer_products__input-card-quantity-1',
  cartTotal: 'customer_products__checkout-bottom-value',
};

describe('Products page', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
    localStorage.clear();
  });

  test(
    'ao carregar a página de produtos, todos os elementos são renderizados',
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

      await waitFor(() => {
        const productsLink = screen
          .getByTestId('customer_products__element-navbar-link-products');

        const ordersLink = screen
          .getByTestId('customer_products__element-navbar-link-orders');

        const customerName = screen
          .getByTestId('customer_products__element-navbar-user-full-name');

        const logoutBtn = screen
          .getByTestId('customer_products__element-navbar-link-logout');

        const cardImg = screen
          .getByTestId(dataTestId.cardImg);

        const cardTitle = screen
          .getByTestId(dataTestId.cardTitle);

        const cardPrice = screen
          .getByTestId(dataTestId.cardPrice);

        const minusBtn = screen
          .getByTestId(dataTestId.minusBtn);

        const plusBtn = screen
          .getByTestId(dataTestId.plusBtn);

        const cardQuantity = screen
          .getByTestId(dataTestId.cardQuantity);

        const cartBtn = screen
          .getByTestId('customer_products__button-cart');

        const cartTotal = screen
          .getByTestId('customer_products__checkout-bottom-value');

        expect(productsLink).toBeInTheDocument();
        expect(ordersLink).toBeInTheDocument();
        expect(customerName).toBeInTheDocument();
        expect(logoutBtn).toBeInTheDocument();
        expect(cardImg).toHaveAttribute('alt', 'Skol Lata 250ml');
        expect(cardPrice).toHaveTextContent(/2,20/i);
        expect(cardTitle).toHaveTextContent(/Skol Lata 250ml/i);
        expect(minusBtn).toBeInTheDocument();
        expect(plusBtn).toBeInTheDocument();
        expect(cardQuantity).toBeInTheDocument();
        expect(cartBtn).toBeInTheDocument();
        expect(cartTotal).toBeInTheDocument();
        expect(cartTotal).toHaveTextContent('0,00');
        userEvent.click(logoutBtn);
      });
    },
  );

  test(
    'é possível adicionar produtos ao carrinho',
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

      const logoutBtn = screen
        .getByTestId('customer_products__element-navbar-link-logout');

      expect(logoutBtn).toBeInTheDocument();

      const cartTotal = screen
        .getByTestId(dataTestId.cartTotal);
      expect(cartTotal).toBeInTheDocument();
      expect(cartTotal).toHaveTextContent('0,00');

      const plusBtn = await screen
        .findByTestId('customer_products__button-card-add-item-1');

      userEvent.dblClick(plusBtn);

      const sumTotal = await screen
        .findByTestId(dataTestId.cartTotal);
      expect(sumTotal).toBeInTheDocument();
      expect(sumTotal).toHaveTextContent('4,40');

      const minusBtn = await screen
        .findByTestId(dataTestId.minusBtn);

      userEvent.dblClick(minusBtn);

      userEvent.click(minusBtn);

      const minusTotal = await screen
        .findByTestId(dataTestId.cartTotal);
      expect(minusTotal).toBeInTheDocument();
      expect(minusTotal).toHaveTextContent('0,00');
    },
  );
});
