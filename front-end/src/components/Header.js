import React from 'react';
import { Link } from 'react-router-dom';
import clearLocalStorage from '../utils/clearLocalStorage';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const { role, name } = user;

  return (
    <header>
      <nav
        className="flex items-center h-16 text-flamingo-50 font-bold uppercase
        bg-flamingo-500"
      >
        {
          role === 'customer'
            ? (
              <div className="flex grow h-full">
                <Link
                  to="/customer/products"
                  className="flex items-center justify-center h-full min-w-[25%] p-3
                  border-r border-r-flamingo-50 text-sm"
                  data-testid="customer_products__element-navbar-link-products"
                >
                  Produtos
                </Link>
                <Link
                  to="/customer/orders"
                  className="flex items-center justify-center h-full min-w-[25%] p-3
                  border-r border-r-flamingo-50 text-sm"
                  data-testid="customer_products__element-navbar-link-orders"
                >
                  Meus Pedidos
                </Link>

              </div>
            ) : null
        }
        {
          role === 'administrator'
            ? (
              <div className="flex grow h-full">
                <Link
                  to="/admin/manage"
                  className="flex items-center justify-center h-full min-w-[25%] p-3
                  border-r border-r-flamingo-50 text-sm"
                  data-testid="customer_products__element-navbar-link-orders"
                >
                  Gerênciar usuários
                </Link>
              </div>
            ) : null
        }
        {
          role === 'seller'
            ? (
              <div className="flex grow h-full">
                <Link
                  to="/seller/orders"
                  className="flex items-center justify-center grow-1 h-full min-w-[25%]
                  p-3 border-r border-r-flamingo-50 text-sm"
                  data-testid="customer_products__element-navbar-link-orders"
                >
                  Pedidos
                </Link>
              </div>
            ) : null
        }
        <span
          to="/customer/products"
          className="flex items-center justify-center h-full min-w-[25%] p-3
          border-x border-x-flamingo-50 text-sm"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {
            name
          }
        </span>
        <Link
          to="/login"
          onClick={ clearLocalStorage }
          className="flex items-center justify-center h-full min-w-[15%] p-3
          text-sm"
          data-testid="customer_products__element-navbar-link-logout"
        >
          Sair
        </Link>
      </nav>
    </header>
  );
}

export default Header;
