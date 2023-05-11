import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import dataValidate from '../utils/dataValidate';
import Select from './Select';
import roleTypes from '../json/roleTypes.json';

function RegisterForm({ register }) {
  const { fields, setFormFields } = useContext(AppContext);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const data = dataValidate(fields);
    setIsValid((data.name && data.email && data.password && fields.role));
  }, [fields]);

  return (
    <form
      className="w-4/5 mx-auto bg-slate-200 p-3 rounded-lg flex flex-wrap
      justify-center gap-y-10"
      action="#"
    >
      <label
        htmlFor="name"
        className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Nome
        <input
          type="name"
          name="name"
          id="name"
          placeholder="Seu nome"
          required=""
          data-testid="admin_manage__input-name"
          value={ fields.name }
          onChange={ setFormFields }
          className="w-44 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm
          rounded-lg focus:ring-primary-600 focus:border-primary-600
          p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
          dark:text-whitedark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </label>
      <label
        htmlFor="email"
        className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Email
        <input
          type="email"
          name="email"
          id="email"
          placeholder="seu-email@site.com.br"
          required=""
          data-testid="admin_manage__input-email"
          value={ fields.email }
          onChange={ setFormFields }
          className="w-44 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm
          rounded-lg focus:ring-primary-600 focus:border-primary-600
          p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </label>
      <label
        htmlFor="password"
        className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Senha
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          required=""
          value={ fields.password }
          onChange={ setFormFields }
          data-testid="admin_manage__input-password"
          className="w-44 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm
          rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full
          p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </label>
      <div className="w-60 inline-block">
        <p
          className="w-full block uppercase tracking-wide text-gray-700
          text-xs font-bold mb-2"
        >
          P. Vendedora Responsável:
        </p>
        <div className="relative">
          <Select
            id="role"
            name="role"
            options={ roleTypes }
            value={ fields.role }
            handleChange={ setFormFields }
            dataTestId="admin_manage__select-role"
          />
        </div>
      </div>
      <button
        type="button"
        disabled={ !isValid }
        onClick={ (e) => register(e) }
        data-testid="admin_manage__button-register"
        className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8
        rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
      >
        Cadastrar
      </button>
    </form>
  );
}

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterForm;
