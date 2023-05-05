import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <Link to="/customer/products">
        Produtos
      </Link>
    </nav>
  );
}

export default NavBar;
