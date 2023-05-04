import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AppContext from '../context/AppContext';
import logo from '../images/logo.png';

function Login() {
  const { email, setEmail, password, setPassword } = useContext(AppContext);
  const history = useHistory();

  const [isValid, setIsValid] = useState(false);

  const validateForms = () => {
    let emailValidation = false;

    // the email validation was found at:
    // https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(regex) && email.includes('.')) {
      emailValidation = true;
    } else {
      emailValidation = false;
    }

    const minLength = 6;

    if (emailValidation && password.length >= minLength) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    // (emailValidation && password.length >= minLength) ? setIsValid(true) : setIsValid(false);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;

    switch (name) {
    case 'email':
      setEmail(value);
      break;
    case 'password':
      setPassword(value);
      break;
    default:
      break;
    }
  };

  useEffect(() => {
    validateForms();
  }, [email, password]);

  const handleClick = () => {
    history.push('/register');
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
            className="flex items-center h-12 px-4 w-64
            bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
            type="text"
            id="email-input"
            name="email"
            value={ email }
            onChange={ (e) => handleChange(e) }
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
            value={ password }
            onChange={ (e) => handleChange(e) }
            data-testid="common_login__input-password"
          />
        </label>
        <button
          className="flex items-center
          justify-center
          h-12
          px-6
          w-64
          bg-blue-600
          mt-8
          rounded
          font-semibold
          text-sm
          text-blue-100
          hover:bg-blue-700"
          type="button"
          onClick={ handleClick }
          data-testid="common_login__button-login"
        >
          Login
        </button>
        <div className="flex mt-6 justify-center text-xs">
          <Link
            className="text-blue-400 hover:text-blue-500"
            to="/register"
            data-testid="common_login__button-register"
          >
            Sign Up
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
