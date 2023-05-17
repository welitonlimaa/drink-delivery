import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import clearLocalStorage from '../utils/clearLocalStorage';

function HamburgueMenu() {
  const user = JSON.parse(localStorage.getItem('user'));
  const { role, name } = user;
  return (
    <nav
      className="flex items-center justify-center flex-col w-full min-[641px]:hidden
      font-bold text-white text-normal bg-flamingo-600"
    >
      {
        role === 'customer'
          ? (
            <>
              <Link
                to="/customer/products"
                className="flex items-center justify-center w-full
                p-5 border-solid border border-x-gray-100"
                data-testid="customer_products__element-navbar-link-products"
              >
                Produtos
              </Link>
              <Link
                to="/customer/orders"
                className="flex items-center justify-center w-full
                p-5 border-solid border border-x-gray-100"
                data-testid="customer_products__element-navbar-link-orders"
              >
                Meus Pedidos
              </Link>
            </>
          ) : null
      }
      {
        role === 'administrator'
          ? (
            <Link
              to="/admin/manage"
              className="flex items-center justify-center w-full
              p-5 border-solid border border-x-gray-100"
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
              className="flex items-center justify-center w-full
              p-5 border-solid border border-x-gray-100"
              data-testid="customer_products__element-navbar-link-orders"
            >
              Pedidos
            </Link>
          ) : null
      }
      <span
        to="/customer/products"
        className="flex items-center justify-center w-full
        p-5 border-solid border border-x-gray-100"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {
          name
        }
      </span>
      <Link
        to="/login"
        onClick={ clearLocalStorage }
        className="flex items-center justify-center w-full
        p-5 border-solid border border-x-gray-100"
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </Link>
    </nav>
  );
}

export default HamburgueMenu;
