import React from 'react';
import PropTypes from 'prop-types';
// import minus from '../images/svg/minus.svg';
// import plus from '../images/svg/plus.svg';

function ProductCard({ id, urlImage, name, price }) {
  return (
    <div
      className="w-80 bg-white shadow rounded"
    >
      <div
        className="h-48 w-full bg-gray-200 flex flex-col justify-between
        p-4 bg-cover bg-center"
      >
        <img
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ urlImage }
          alt={ name }
        />
      </div>
      <div className="p-4 flex flex-col items-center">
        <h1
          data-testid={ `customer_products__element-card-title-${id}` }
          className="text-gray-800 text-center mt-1"
        >
          { name }
        </h1>
        <p
          data-testid={ `customer_products__element-card-price-${id}` }
          className="text-center text-gray-800 mt-1"
        >
          { price.replace(/\./, ',') }
        </p>
        <div className="inline-flex items-center mt-2">
          <button
            type="button"
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            className="bg-white rounded-l border text-gray-600
            hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50
            inline-flex items-center px-2 py-1 border-r border-gray-200"
          >
            -
          </button>
          <input
            data-testid={ `customer_products__input-card-quantity-${id}` }
            className="bg-gray-100 border-t border-b border-gray-100 text-gray-600
            hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none"
            type="number"
          />
          <button
            type="button"
            data-testid={ `customer_products__button-card-add-item-${id}` }
            className="bg-white rounded-r border text-gray-600 hover:bg-gray-100
            active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1
            border-r border-gray-200"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  urlImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default ProductCard;
