import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory, Navigate } from 'react-router-dom/cjs/react-router-dom.min';
import AppContext from '../context/AppContext';
import logo from '../images/logo.png';
import dataValidate from '../utils/dataValidate';

function Login() {
  const { fields, setFormFields } = useContext(AppContext);
  const [isValid, setIsValid] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const login = async (event) => {
    event.preventDefault();

    try {
      const { token } = await requestLogin('/login', { email, password });
      console.log(token);
      setIsLogged(true);
    } catch (error) {
      isValid(false);
    }
  };

  useEffect(() => {
    const data = dataValidate(fields);
    setIsValid((data.email && data.password));
  }, [fields]);

  if (isLogged) return <Navigate to="/matches" />;

  const history = useHistory();
  const handleClick = () => {
    if (isValid) {
      history.push('/customer/products');
    }
  };

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col justify-center bg-white rounded shadow-lg p-12"
        action=""
      >
        <img className="w-200 mr-2" src={ logo } alt="logo" />
        <label
          className="font-semibold text-xs"
          htmlFor="email-input"
        >
          Username or Email
          <input
            className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2
            rounded focus:outline-none focus:ring-2"
            type="text"
            id="email-input"
            name="email"
            value={ fields.email }
            onChange={ setFormFields }
            data-testid="common_login__input-email"
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
            name="password"
            id="password-input"
            value={ fields.password }
            onChange={ setFormFields }
            data-testid="common_login__input-password"
          />
        </label>
        <button
          type="button"
          disabled={ !isValid }
          onClick={ handleClick }
          data-testid="common_login__button-login"
          className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600
          mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
        >
          Login
        </button>
        <div className="flex mt-6 justify-center text-xs">
          <Link
            className="text-blue-400 hover:text-blue-500"
            to="/register"
            data-testid="common_login__button-register"
          >
            Ainda não tenho conta
          </Link>
        </div>
        {
          !isValid
            ? <p data-testid="common_login__element-invalid-email">Dados Inválidos</p>
            : null
        }
      </form>
    </div>
  );
}

export default Login;
