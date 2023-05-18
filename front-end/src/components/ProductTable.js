import PropTypes from 'prop-types';

function ProductTable({ item, id, name, price, quantity, urlImage, hasButton, remove }) {
  const subTotal = (Number(price) * Number(quantity)).toFixed(2);
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <tr className="border-b dark:border-neutral-500">
      <th
        scope="row"
        data-testid={
          hasButton
            ? `${user.role}_checkout__element-order-table-item-number-${item}`
            : `${user.role}_order_details__element-order-table-item-number-${item}`
        }
        className="whitespace-nowrap px-6 py-4 font-medium"
      >
        { item + 1 }
      </th>
      <td
        data-testid={
          hasButton
            ? `${user.role}_checkout__element-order-table-name-${item}`
            : `${user.role}_order_details__element-order-table-name-${item}`
        }
        className="whitespace-nowrap px-6 py-4"
      >
        <img
          src={ urlImage }
          alt={ name }
          className="w-20"
        />
        <span>{ name }</span>
      </td>
      <td
        data-testid={
          hasButton
            ? `${user.role}_checkout__element-order-table-quantity-${item}`
            : `${user.role}_order_details__element-order-table-quantity-${item}`
        }
        className="whitespace-nowrap px-6 py-4"
      >
        { quantity }
      </td>
      <td
        data-testid={
          hasButton
            ? `${user.role}_checkout__element-order-table-unit-price-${item}`
            : `${user.role}_order_details__element-order-table-unit-price-${item}`
        }
        className="whitespace-nowrap px-6 py-4"
      >
        { (Number(price).toFixed(2)).replace(/\./, ',') }
      </td>
      <td
        data-testid={
          hasButton
            ? `${user.role}_checkout__element-order-table-sub-total-${item}`
            : `${user.role}_order_details__element-order-table-sub-total-${item}`
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
              className="font-bold text-flamingo-500 dark:text-blue-500 hover:underline"
              data-testid={ `${user.role}_checkout__element-order-table-remove-${item}` }
            >
              Remover
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
  urlImage: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  hasButton: PropTypes.bool.isRequired,
  remove: PropTypes.func.isRequired,
};

export default ProductTable;
