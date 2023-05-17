import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import clearLocalStorage from '../utils/clearLocalStorage';

function Menu() {
  const user = JSON.parse(localStorage.getItem('user'));
  const { role, name } = user;
  return (
    <nav
      className="hidden text-white font-bold uppercase space-x-8 lg:flex"
    >
      {
        role === 'customer'
          ? (
            <>
              <Link
                to="/customer/products"
                className="flex items-center justify-center w-40 text-sm bg-flamingo-700"
                data-testid="customer_products__element-navbar-link-products"
              >
                Produtos
              </Link>
              <Link
                to="/customer/orders"
                className="flex items-center justify-center w-40 text-sm bg-flamingo-700"
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
            <div className="flex grow h-full">
              <Link
                to="/admin/manage"
                className="flex items-center justify-center w-40 text-sm bg-flamingo-700"
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
            <Link
              to="/seller/orders"
              className="flex items-center justify-center w-40 text-sm bg-flamingo-700"
              data-testid="customer_products__element-navbar-link-orders"
            >
              Pedidos
            </Link>
          ) : null
      }
      <span
        to="/customer/products"
        className="flex items-center justify-center w-40 text-sm bg-flamingo-700"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {
          name
        }
      </span>
      <Link
        to="/login"
        onClick={ clearLocalStorage }
        className="flex items-center justify-center w-40 text-sm bg-flamingo-700"
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </Link>
    </nav>
  );
}

export default Menu;
