import React, { useContext, useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { isExpired } from 'react-jwt';
import AppContext from '../context/AppContext';
import logo from '../images/logo.png';
import dataValidate from '../utils/dataValidate';
import { requestLogin } from '../services/requests';
import routes from '../json/routes.json';

function Login() {
  const { fields, setFormFields, userData, setUserData } = useContext(AppContext);
  const [isValid, setIsValid] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [unauthorized, changeAuthorized] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    try {
      const data = await requestLogin(
        '/login',
        { email: fields.email, password: fields.password },
      );
      setUserData(data);
      setIsLogged(true);
    } catch (error) {
      setIsValid(false);
      changeAuthorized(true);
      // console.log(error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const isTokenExpired = isExpired(user.token);
      setIsLogged(!isTokenExpired);
    }
  }, []);

  useEffect(() => {
    const data = dataValidate(fields);
    setIsValid((data.email && data.password));
  }, [fields]);

  const history = useHistory();
  const handleClick = (endpoint) => {
    history.push(endpoint);
  };

  if (isLogged) return <Redirect to={ `${routes[userData.role]}` } />;

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
          onClick={ (e) => login(e) }
          data-testid="common_login__button-login"
          className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600
          mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
        >
          Login
        </button>
        <div className="flex mt-6 justify-center text-xs">
          <button
            className="text-blue-400 hover:text-blue-500"
            name="register"
            onClick={ () => handleClick('/register') }
            data-testid="common_login__button-register"
            type="button"
          >
            Ainda não tenho conta
          </button>
        </div>
        {
          unauthorized
            ? <p data-testid="common_login__element-invalid-email">Dados Inválidos</p>
            : null
        }
      </form>
    </div>
  );
}

export default Login;
