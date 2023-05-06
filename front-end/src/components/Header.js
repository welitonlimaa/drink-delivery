import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const { role, name } = user;

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <header>
      <nav
        className="flex items-center bg-green-700 h-16 text-white font-bold"
      >
        {
          role === 'customer'
            ? (
              <div className=" flex grow">
                <Link
                  to="/customer/products"
                  className="p-3 flex items-center h-full text-sm"
                  data-testid="customer_products__element-navbar-link-products"
                >
                  Produtos
                </Link>
                <Link
                  to="/customer/orders"
                  className="p-3 flex items-center grow h-full text-sm"
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
              <Link
                to="/admin/manager"
                className="p-3 flex items-center grow h-full text-sm"
                data-testid="customer_products__element-navbar-link-orders"
              >
                Gerênciar usuários
              </Link>
            ) : null
        }
        {
          role === 'seller'
            ? (
              <Link
                to="/seller/orders"
                className="p-3 flex items-center grow h-full text-sm"
                data-testid="customer_products__element-navbar-link-orders"
              >
                Pedidos
              </Link>
            ) : null
        }
        <span
          to="/customer/products"
          className="bg-indigo-800 h-full p-3 flex items-center text-sm"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {
            name
          }
        </span>
        <Link
          to="/login"
          onClick={ clearLocalStorage }
          className="p-3 flex items-center bg-blue-600 h-full text-sm"
          data-testid="customer_products__element-navbar-link-logout"
        >
          Sair
        </Link>
      </nav>
    </header>
  );
}

export default Header;
