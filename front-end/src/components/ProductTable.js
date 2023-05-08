import PropTypes from 'prop-types';

function ProductTable({ item, id, name, price, quantity, remove }) {
  const subTotal = Number(price) * quantity;
  return (
    <tr className="border-b dark:border-neutral-500">
      <th
        scope="row"
        data-testid={ `customer_checkout__element-order-table-item-number-${item}` }
        className="whitespace-nowrap px-6 py-4 font-medium"
      >
        { item }
      </th>
      <td
        data-testid={ `customer_checkout__element-order-table-name-${item}` }
        className="whitespace-nowrap px-6 py-4"
      >
        { name }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-quantity-${item}` }
        className="whitespace-nowrap px-6 py-4"
      >
        { quantity }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-unit-price-${item}` }
        className="whitespace-nowrap px-6 py-4"
      >
        { price.replace(/\./, ',') }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-sub-total-${item}` }
        className="whitespace-nowrap px-6 py-4"
      >
        { subTotal }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-remove-${item}` }
        className="whitespace-nowrap px-6 py-4"
      >
        <button
          type="button"
          onClick={ () => remove(id) }
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Remove
        </button>
      </td>
    </tr>
  );
}

ProductTable.propTypes = {
  item: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
};

export default ProductTable;
