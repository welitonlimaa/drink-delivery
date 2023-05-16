import PropTypes from 'prop-types';

function LoginForm({ login, handleClick, fields, setFormFields, isValid, unauthorized }) {
  return (
    <form
      className="flex flex-col justify-center rounded shadow-lg p-12"
      action=""
    >
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
        mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700
        bg-flamingo-500"
      >
        Login
      </button>
      <div className="flex mt-6 justify-center text-xs">
        <button
          name="register"
          onClick={ () => handleClick('/register') }
          data-testid="common_login__button-register"
          type="button"
          className="text-blue-400 hover:text-blue-500 bg-flamingo-500"
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
  );
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  fields: PropTypes.objectOf(PropTypes.string).isRequired,
  setFormFields: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  unauthorized: PropTypes.bool.isRequired,
};

export default LoginForm;
