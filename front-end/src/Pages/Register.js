import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

function Register() {
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
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8 shadow-lg shadow-gray-500">
        <Link
          to="/login"
          className="flex items-center
          text-2xl
          font-semibol
          text-gray-900
          dark:text-white
          "
        >
          <img className="w-200 mx-auto" src={ logo } alt="logo" />
        </Link>
        <h1
          className="text-xl font-bold leading-tight
              tracking-tight text-gray-900 md:text-2xl dark:text-white"
        >
          Create and account
        </h1>
        <form className="space-y-4 md:space-y-6" action="#">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium
                  text-gray-900
                  dark:text-white"
          >
            Your email
            <input
              type="email"
              name="email"
              id="email"
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
              placeholder="name@company.com"
              required=""
            />
          </label>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium
                  text-gray-900 dark:text-white"
          >
            Password
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
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
            />
          </label>
          <label
            htmlFor="confirm-password"
            className="block mb-2 text-sm font-medium
                  text-gray-900
                  dark:text-white"
          >
            Confirm password
            <input
              type="confirm-password"
              name="confirm-password"
              id="confirm-password"
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
            />
          </label>
          <div className="flex items-start">
            <input
              id="terms"
              aria-describedby="terms"
              type="checkbox"
              className="w-4 h-4 border
                    border-gray-300 rounded
                    bg-gray-50 focus:ring-3
                    focus:ring-primary-300
                    dark:bg-gray-700
                    dark:border-gray-600
                    dark:focus:ring-primary-600
                    dark:ring-offset-gray-800"
              required=""
            />
            <label
              htmlFor="terms"
              className="font-light
                    text-gray-500
                    dark:text-gray-300"
            >
              I accept the
              {' '}
            </label>
            <Link
              className="
                font-medium text-primary-600
                hover:underline dark:text-primary-500
                text-gray-500"
              to="/login"
            >
              Terms and Conditions
            </Link>
          </div>
          <button
            type="submit"
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
        </form>
      </div>
    </div>
  );
}

export default Register;
