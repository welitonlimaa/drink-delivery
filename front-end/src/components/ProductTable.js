import PropTypes from 'prop-types';

function ProductTable({ item, id, name, price, quantity, hasButton, remove }) {
  const subTotal = (Number(price) * Number(quantity)).toFixed(2);
  return (
    <tr className="border-b dark:border-neutral-500">
      <th
        scope="row"
        data-testid={
          hasButton
            ? `customer_checkout__element-order-table-item-number-${item}`
            : `customer_order_details__element-order-table-item-number-${item}`
        }
        className="whitespace-nowrap px-6 py-4 font-medium"
      >
        { item + 1 }
      </th>
      <td
        data-testid={
          hasButton
            ? `customer_checkout__element-order-table-name-${item}`
            : `customer_order_details__element-order-table-name-${item}`
        }
        className="whitespace-nowrap px-6 py-4"
      >
        { name }
      </td>
      <td
        data-testid={
          hasButton
            ? `customer_checkout__element-order-table-quantity-${item}`
            : `customer_order_details__element-order-table-quantity-${item}`
        }
        className="whitespace-nowrap px-6 py-4"
      >
        { quantity }
      </td>
      <td
        data-testid={
          hasButton
            ? `customer_checkout__element-order-table-unit-price-${item}`
            : `customer_order_details__element-order-table-unit-price-${item}`
        }
        className="whitespace-nowrap px-6 py-4"
      >
        { (Number(price).toFixed(2)).replace(/\./, ',') }
      </td>
      <td
        data-testid={
          hasButton
            ? `customer_checkout__element-order-table-sub-total-${item}`
            : `customer_order_details__element-order-table-sub-total-${item}`
        }
        className="whitespace-nowrap px-6 py-4"
      >
        { subTotal.replace(/\./, ',') }
      </td>
      {
        hasButton ? (
          <td
            className="whitespace-nowrap px-6 py-4"
          >
            <button
              type="button"
              onClick={ () => remove(id) }
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              data-testid={ `customer_checkout__element-order-table-remove-${item}` }
            >
              Remove
            </button>
          </td>
        ) : null
      }
    </tr>
  );
}

ProductTable.propTypes = {
  item: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  hasButton: PropTypes.bool.isRequired,
  remove: PropTypes.func.isRequired,
};

export default ProductTable;
