import PropTypes from 'prop-types';

function LoginForm({ login, handleClick, fields, setFormFields, isValid, unauthorized }) {
  return (
    <form
      className="flex flex-col items-center justify-center
      w-3/4 max-[640px]:w-96 p-5 max-[640px]:p-10 font-normal"
      action=""
    >
      <label
        className="w-full"
        htmlFor="email-input"
      >
        Email
        <input
          className="flex items-center h-12 px-4 w-full bg-gray-200 mt-2
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
        className="w-full mt-3"
        htmlFor="password-input"
      >
        Password
        <input
          className="flex items-center h-12 px-4 w-full
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
        className="flex items-center justify-center h-12 px-6 w-full bg-blue-600
        mt-8 rounded-md text-white font-semibold bg-flamingo-500"
      >
        Login
      </button>
      <div className="flex justify-center mt-6">
        <button
          name="register"
          onClick={ () => handleClick('/register') }
          data-testid="common_login__button-register"
          type="button"
          className="font-medium"
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
