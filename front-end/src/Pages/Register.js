import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import AppContext from '../context/AppContext';

function Register() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    completeName,
    setCompleteName,
  } = useContext(AppContext);
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

    const minpassWord = 6;

    const minName = 12;

    if (emailValidation
      && password.length >= minpassWord
      && completeName.length >= minName) {
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
    case 'name':
      setCompleteName(value);
      break;
    default:
      break;
    }
  };

  useEffect(() => {
    validateForms();
  }, [email, password, completeName]);

  return (
    <div
      className="
      flex flex-col items-center
      justify-center px-6 py-8 mx-auto md:h-screen lg:py-0
          w-full
          h-full
        bg-white rounded-lg
          shadow dark:border
          dark:bg-gray-800
          dark:border-gray-700"
    >
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8 shadow-lg shadow-transparent-500">
        <Link
          to="/login"
          className="flex items-center
          text-2xl
          font-semibol
          text-gray-900
          dark:text-white
          "
        >
          <img className="w-150 mx-auto" src={ logo } alt="logo" />
        </Link>
        <h1
          className="text-xl
          font-bold leading-tight
          tracking-tight
          text-gray-900 md:text-2xl
          dark:text-white"
        >
          Cadastro
        </h1>
        <form className="space-y-4 md:space-y-6" action="#">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium
                  text-gray-900
                  dark:text-white"
          >
            Nome
            <input
              type="name"
              name="name"
              id="name"
              className="bg-gray-50 border
                      border-gray-300 text-gray-900 sm:text-sm rounded-lg
                      focus:ring-primary-600
                      focus:border-primary-600 block w-full p-2.5
                      dark:bg-gray-700
                      dark:border-gray-600
                      dark:placeholder-gray-400
                      dark:text-white
                      dark:focus:ring-blue-500
                      dark:focus:border-blue-500"
              placeholder="Seu nome"
              required=""
              data-testid="common_register__input-name"
              onChange={ (e) => handleChange(e) }
            />
          </label>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium
                  text-gray-900 dark:text-white"
          >
            Email
            <input
              type="email"
              name="email"
              id="email"
              placeholder="seu-email@site.com.br"
              className="bg-gray-50
                    border border-gray-300
                    text-gray-900 sm:text-sm rounded-lg
                    focus:ring-primary-600
                    focus:border-primary-600
                    block w-full p-2.5
                    dark:bg-gray-700
                    dark:border-gray-600
                    dark:placeholder-gray-400
                    dark:text-white
                    dark:focus:ring-blue-500
                    dark:focus:border-blue-500"
              required=""
              data-testid="common_register__input-email"
              onChange={ (e) => handleChange(e) }
            />
          </label>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium
                  text-gray-900
                  dark:text-white"
          >
            Senha
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border
                    border-gray-300
                    text-gray-900 sm:text-sm
                    rounded-lg
                    focus:ring-primary-600
                    focus:border-primary-600
                    block w-full p-2.5
                    dark:bg-gray-700
                    dark:border-gray-600
                    dark:placeholder-gray-400
                    dark:text-white
                    dark:focus:ring-blue-500
                    dark:focus:border-blue-500"
              required=""
              data-testid="common_register__input-password"
              onChange={ (e) => handleChange(e) }
            />
          </label>
          <button
            type="button"
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
            data-testid="common_register__button-register"
            disabled={ !isValid }
          >
            Create an account
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?
            {' '}
            <Link
              to="/login"
              className="
              font-medium
              text-primary-600
              hover:underline
              dark:text-primary-500"
            >
              Login here
            </Link>
          </p>
          {
            !isValid ? (
              <p
                data-testid="common_register__element-invalid_register"
              >
                Dados Inválidos
              </p>
            )
              : null
          }
        </form>
      </div>
    </div>
  );
}

export default Register;
