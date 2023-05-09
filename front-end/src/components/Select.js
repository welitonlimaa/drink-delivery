import PropTypes from 'prop-types';

function Select({ id, name, value, options, handleChange }) {
  return (
    <select
      id={ id }
      name={ name }
      onChange={ handleChange }
      defaultValue={ value }
      className="min-[641px]:p-2.5 max-[640px]:w-full max-[640px]:p-4
      max-[640px]:m-1 bg-gray-50 border border-gray-300 text-gray-900
      text-lg rounded-lg"
    >
      {
        options.map((seller, index) => (
          <option
            key={ index }
            value={ seller.id }
          >
            { seller.name }
          </option>))
      }
    </select>
  );
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Select;
