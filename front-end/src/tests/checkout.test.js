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
} from './mocks/login/customer.mock';

const dataTestId = {
  email: 'common_login__input-email',
  password: 'common_login__input-password',
  loginBtn: 'common_login__button-login',
  cartTotal: 'customer_products__checkout-bottom-value',
  cartPlus: 'customer_products__button-card-add-item-1',
  createOrderBtn: 'customer_checkout__button-submit-order',
  tableItem: 'customer_checkout__element-order-table-item-number-0',
  tableDescription: 'customer_checkout__element-order-table-name-0',
  tableQuantity: 'customer_checkout__element-order-table-quantity-0',
  tableUnityPrice: 'customer_checkout__element-order-table-unit-price-0',
  tableSubTotal: 'customer_checkout__element-order-table-sub-total-0',
  tableRemoveItem: 'customer_checkout__element-order-table-remove-0',
  formSeller: 'customer_checkout__select-seller',
  formAddress: 'customer_checkout__input-address',
  formNumber: 'customer_checkout__input-address-number',
  tableTotal: 'customer_checkout__element-order-total-price',
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

      const plusBtn1 = await screen
        .findByTestId(dataTestId.cartPlus);
      userEvent.dblClick(plusBtn1);
      const cartSum = await screen.findByTestId(dataTestId.cartTotal);
      userEvent.click(cartSum);

      const finishBtn = await screen.findByTestId(dataTestId.createOrderBtn);
      expect(finishBtn).toBeInTheDocument();
      const tableItem = screen.getByTestId(dataTestId.tableItem);
      const tableDescription = screen.getByTestId(dataTestId.tableDescription);
      const tableQuantity = screen.getByTestId(dataTestId.tableQuantity);
      const tableUnityPrice = screen.getByTestId(dataTestId.tableUnityPrice);
      const tableSubTotal = screen.getByTestId(dataTestId.tableSubTotal);
      const tableRemoveItem = screen.getByTestId(dataTestId.tableRemoveItem);
      const tableTotal = screen.getByTestId(dataTestId.tableTotal);
      const formSeller = screen.getByTestId(dataTestId.tableRemoveItem);
      const formAddress = screen.getByTestId(dataTestId.formAddress);
      const formNumber = screen.getByTestId(dataTestId.formNumber);

      expect(tableItem).toBeInTheDocument();
      expect(tableDescription).toBeInTheDocument();
      expect(tableQuantity).toBeInTheDocument();
      expect(tableUnityPrice).toBeInTheDocument();
      expect(tableSubTotal).toBeInTheDocument();
      expect(tableRemoveItem).toBeInTheDocument();
      expect(tableTotal).toBeInTheDocument();
      expect(tableTotal.innerHTML).toBe('4,40');
      expect(formSeller).toBeInTheDocument();
      expect(formAddress).toBeInTheDocument();
      expect(formNumber).toBeInTheDocument();
    },
  );

  test(
    'é possível excluir um elemento da tabela',
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

      const plusBtn1 = await screen
        .findByTestId(dataTestId.cartPlus);
      userEvent.dblClick(plusBtn1);
      const cartSum = await screen.findByTestId(dataTestId.cartTotal);
      userEvent.click(cartSum);

      await screen.findByTestId(dataTestId.createOrderBtn);
      const tableItem = screen.getByTestId(dataTestId.tableItem);
      expect(tableItem).toBeInTheDocument();

      const tableTotal = screen.getByTestId(dataTestId.tableTotal);
      expect(tableTotal.innerHTML).toBe('4,40');

      const tableRemoveItem = screen.getByTestId(dataTestId.tableRemoveItem);

      userEvent.click(tableRemoveItem);
      expect(tableItem).not.toBeInTheDocument();

      const newTotal = await screen.findByTestId(dataTestId.tableTotal);
      expect(newTotal.innerHTML).toBe('0,00');
    },
  );

  test(
    'é possível cadastrar um novo pedido',
    async () => {
      const { history } = renderWithRouter(
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

      const plusBtn1 = await screen
        .findByTestId(dataTestId.cartPlus);
      userEvent.dblClick(plusBtn1);
      const cartSum = await screen.findByTestId(dataTestId.cartTotal);
      userEvent.click(cartSum);

      const finishBtn = await screen.findByTestId(dataTestId.createOrderBtn);
      const formAddress = screen.getByTestId(dataTestId.formAddress);
      const formNumber = screen.getByTestId(dataTestId.formNumber);
      userEvent.type(formAddress, 'Rua da fulana');
      userEvent.type(formNumber, '100');
      await waitFor(async () => {
        const selectSeller = await screen.findByTestId(dataTestId.formSeller);

        userEvent.selectOptions(selectSeller, '2');

        expect(selectSeller.value).toBe('2');
      });

      expect(finishBtn.disabled).toBe(false);

      userEvent.click(finishBtn);

      await waitForElementToBeRemoved(finishBtn);

      expect((history.location.pathname).includes('/customer/orders')).toBe(true);
    },
  );
});
