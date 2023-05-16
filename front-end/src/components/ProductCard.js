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
      className="w-80 my-2 border-2 shadow-md shadow-gray-400 rounded-2xl
      bg-white hover:brightness-105"
    >
      <div className="inline-block m-2">
        <p
          data-testid={ `customer_products__element-card-price-${id}` }
          className="p-1 rounded text-center font-semibold text-gray-800 mt-1
          bg-flamingo-300"
        >
          {`R$ ${price.replace(/\./, ',')}`}
        </p>
      </div>
      <img
        src={ urlImage }
        alt={ name }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        className="inline w-full"
      />
      <div className="flex flex-col items-center p-4 rounded bg-gray-100">
        <h1
          data-testid={ `customer_products__element-card-title-${id}` }
          className="text-gray-800 text-center mt-1"
        >
          { name }
        </h1>
        <div className="inline-flex items-center justify-center mt-2">
          <button
            type="button"
            onClick={ minus }
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            className="w-[10%] rounded mx-1 text-flamingo-50 text-center select-none
            bg-flamingo-500"
          >
            -
          </button>
          <input
            type="number"
            value={ productQuantity }
            onChange={ (e) => setProductQuantity(e.target.value) }
            min="0"
            data-testid={ `customer_products__input-card-quantity-${id}` }
            className="max-w-[10%] text-gray-500 text-center select-none"
          />
          <button
            type="button"
            onClick={ plus }
            data-testid={ `customer_products__button-card-add-item-${id}` }
            className="w-[10%] rounded mx-1 text-flamingo-50 text-center select-none
            bg-flamingo-500"
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
