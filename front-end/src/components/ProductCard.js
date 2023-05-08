import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function ProductCard({ id, urlImage, name, price, quantity, updateProductCart }) {
  const [productQuantity, setProductQuantity] = useState(quantity);

  const minus = () => {
    const number = Number(productQuantity);
    if (number === 0) return setProductQuantity(0);
    setProductQuantity(number - 1);
  };

  const plus = () => {
    const number = Number(productQuantity);
    setProductQuantity(number + 1);
  };

  useEffect(() => {
    updateProductCart({ id, urlImage, name, price, productQuantity });
  }, [productQuantity]);

  return (
    <div
      className="w-80 bg-white shadow rounded"
    >
      <img
        src={ urlImage }
        alt={ name }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        className="w-full"
      />
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
            onClick={ minus }
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            className="bg-white rounded-l border text-gray-600
            hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50
            inline-flex items-center px-2 py-1 border-r border-gray-200"
          >
            -
          </button>
          <input
            type="number"
            value={ productQuantity }
            onChange={ (e) => setProductQuantity(e.target.value) }
            min="0"
            data-testid={ `customer_products__input-card-quantity-${id}` }
            className="bg-gray-100 border-t border-b border-gray-100 text-gray-600
            hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none"
          />
          <button
            type="button"
            onClick={ plus }
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
  quantity: PropTypes.number.isRequired,
  updateProductCart: PropTypes.func.isRequired,
};

export default ProductCard;
