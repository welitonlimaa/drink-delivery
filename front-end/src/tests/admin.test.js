import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import adminLoginData from './mocks/adminMock';
import AppProvider from '../context/AppProvider';
import renderWithRouter from '../utils/renderWithRouter';

describe('Admin page', () => {
  test('if route /admin/manage render admin page', async () => {
    const { history } = renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    const inputEmail = screen.getByTestId('common_login__input-email');
    const inputPassword = screen.getByTestId('common_login__input-password');
    const buttonLogin = screen.getByTestId('common_login__button-login');

    userEvent.type(inputEmail, adminLoginData.email);
    userEvent.type(inputPassword, adminLoginData.password);
    expect(buttonLogin.disabled).toBe(false);
    userEvent.click(buttonLogin);
    await waitFor(() => {
      expect(history.location.pathname).toEqual('/admin/manage');
    });
  });

  test('if header admin page', async () => {
    renderWithRouter(
      <AppProvider>
        <App />
      </AppProvider>,
    );

    const inputEmail = screen.getByTestId('common_login__input-email');
    const inputPassword = screen.getByTestId('common_login__input-password');
    const buttonLogin = screen.getByTestId('common_login__button-login');

    userEvent.type(inputEmail, adminLoginData.email);
    userEvent.type(inputPassword, adminLoginData.password);
    expect(buttonLogin.disabled).toBe(false);
    userEvent.click(buttonLogin);

    await waitFor(() => {
      const link = screen.getAllByTestId('customer_products__element-navbar-link-orders');
      expect(link.innerText).toEqual('Gerênciar usuários');
    });
  });
});
