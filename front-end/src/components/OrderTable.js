import PropTypes from 'prop-types';
import ProductTable from './ProductTable';

function OrderTable({ products }) {
  return (
    <table className="min-w-full text-left text-sm font-light">
      <thead
        className="border-b font-medium dark:border-neutral-500"
      >
        <tr>
          <th scope="col" className="px-6 py-4">
            Item
          </th>
          <th scope="col" className="px-6 py-4">
            Descrição
          </th>
          <th scope="col" className="px-6 py-4">
            Quantidade
          </th>
          <th scope="col" className="px-6 py-4">
            Valor Unitário
          </th>
          <th scope="col" className="px-6 py-4">
            Sub-total
          </th>
        </tr>
      </thead>
      <tbody>
        {
          products.map(({ id, name, price, SalesProducts }, index) => (
            <ProductTable
              key={ index }
              item={ index }
              id={ id }
              name={ name }
              price={ price }
              quantity={ SalesProducts.quantity }
              hasButton={ false }
            />))
        }
      </tbody>
    </table>
  );
}

OrderTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

export default OrderTable;
