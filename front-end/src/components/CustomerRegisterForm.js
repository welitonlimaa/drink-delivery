import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function CustomerRegisterForm({
  register,
  fields,
  setFormFields,
  isValid,
  unauthorized,
}) {
  return (
    <form
      className="flex flex-col items-center justify-center
      w-1/3 h-1/3 max-[640px]:w-96 py-10 max-[640px]:p-10 font-normal
      border-solid border border-gray-200 shadow-md rounded-lg bg-gray-100"
      action="#"
    >
      <label
        htmlFor="name"
        className="w-5/6"
      >
        Nome
        <input
          type="name"
          name="name"
          id="name"
          placeholder="Seu nome"
          required=""
          data-testid="common_register__input-name"
          value={ fields.name }
          onChange={ setFormFields }
          className="flex items-center h-12 px-4 w-full mt-2
          border-solid border border-black rounded bg-white"
        />
      </label>
      <label
        htmlFor="email"
        className="w-5/6"
      >
        Email
        <input
          type="email"
          name="email"
          id="email"
          placeholder="seu-email@site.com.br"
          required=""
          data-testid="common_register__input-email"
          value={ fields.email }
          onChange={ setFormFields }
          className="flex items-center h-12 px-4 w-full mt-2
          border-solid border border-black rounded bg-white"
        />
      </label>
      <label
        htmlFor="password"
        className="w-5/6"
      >
        Senha
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          required=""
          data-testid="common_register__input-password"
          value={ fields.password }
          onChange={ setFormFields }
          className="flex items-center h-12 px-4 w-full mt-2
          border-solid border border-black rounded bg-white"
        />
      </label>
      <button
        type="button"
        disabled={ !isValid }
        onClick={ (e) => register(e) }
        data-testid="common_register__button-register"
        className="flex items-center justify-center h-12 px-6 w-5/6 bg-blue-600
        mt-8 rounded-md text-white font-semibold bg-flamingo-500"
      >
        Cadastrar
      </button>
      <p className="my-4 text-sm font-ligh">
        Já possui uma conta?
        {' '}
        <Link
          to="/login"
          className="font-semibold text-primary-600 hover:underline
          dark:text-primary-500"
        >
          Login aqui!
        </Link>
      </p>
      {
        unauthorized ? (
          <p data-testid="common_register__element-invalid_register">
            Dados Inválidos
          </p>
        )
          : null
      }
    </form>
  );
}

CustomerRegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
  fields: PropTypes.objectOf(PropTypes.string).isRequired,
  setFormFields: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  unauthorized: PropTypes.bool.isRequired,
};

export default CustomerRegisterForm;
