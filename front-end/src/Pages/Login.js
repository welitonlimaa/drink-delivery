import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AppContext from '../context/AppContext';

function Login() {
  const { email, setEmail } = useContext(AppContext);
  const history = useHistory();

  const handleClick = () => {
    history.push('/register');
  };

  return (
    <div>
      <h1 className="font-bold text-2xl">Welcome Back :)</h1>
      <form
        className="flex flex-col bg-white rounded shadow-lg p-12 mt-12"
        action=""
      >
        <label
          className="font-semibold text-xs"
          htmlFor="email-input"
        >
          Username or Email
          <input
            className="flex items-center h-12 px-4 w-64
            bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="text"
            id="email-input"
          />
        </label>
        <label
          className="font-semibold text-xs mt-3"
          htmlFor="password-input"
        >
          Password
          <input
            className="flex items-center h-12 px-4 w-64
            bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="password"
            id="password-input"
          />
        </label>
        <button
          className="flex items-center justify-center h-12 px-6 w-64
          bg-blue-600 mt-8 rounded font-semibold text-sm
          text-blue-100 hover:bg-blue-700"
          type="button"
        >
          Login
        </button>
        <div className="flex mt-6 justify-center text-xs">
          <a
            className="text-blue-400 hover:text-blue-500"
            href=""
          >
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
