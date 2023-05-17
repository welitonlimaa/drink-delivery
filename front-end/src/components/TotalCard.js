import PropTypes from 'prop-types';

function TotalCard({ total, testPrefix }) {
  return (
    <p
      className="w-80 max-[640px]:w-full p-5 my-10
      rounded-lg font-bold text-center text-3xl text-white bg-flamingo-500"
    >
      Total: R$
      {' '}
      <span
        data-testid={ `${testPrefix}element-order-total-price` }
      >
        { (total.toFixed(2)).replace(/\./, ',') }
      </span>
    </p>
  );
}

TotalCard.propTypes = {
  total: PropTypes.number.isRequired,
  testPrefix: PropTypes.string.isRequired,
};

export default TotalCard;
