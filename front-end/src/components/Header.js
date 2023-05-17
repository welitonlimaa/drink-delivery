import React, { useState } from 'react';
import Menu from './Menu';
import logo from '../images/logo-remove.png';
import HamburgueMenu from './HamburgueMenu';

function Header() {
  const [isVisible, setVisible] = useState(false);

  return (
    <header>
      <nav
        className="flex justify-between w-full p-4
        bg-flamingo-600"
      >
        <img className="w-60" src={ logo } alt="logo" />
        <div className="hidden space-x-8 lg:flex">
          <Menu />
        </div>
        <button
          type="button"
          onClick={ () => setVisible(!isVisible) }
          className="flex items-center justify-center min-h-full lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>
      {
        isVisible ? <HamburgueMenu /> : null
      }
    </header>
  );
}

export default Header;
