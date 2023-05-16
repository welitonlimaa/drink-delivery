import PropTypes from 'prop-types';

function UserRowTable({ item, id, name, email, role, deleteUser }) {
  return (
    <tr className="border-b dark:border-neutral-500 font-normal">
      <th
        scope="row"
        data-testid={ `admin_manage__element-user-table-item-number-${item}` }
        className="whitespace-nowrap px-6 py-4"
      >
        { item + 1 }
      </th>
      <td
        data-testid={ `admin_manage__element-user-table-name-${item}` }
        className="whitespace-nowrap px-6 py-4"
      >
        { name }
      </td>
      <td
        data-testid={ `admin_manage__element-user-table-email-${item}` }
        className="whitespace-nowrap px-6 py-4"
      >
        { email }
      </td>
      <td
        data-testid={ `admin_manage__element-user-table-role-${item}` }
        className="whitespace-nowrap px-6 py-4"
      >
        { role }
      </td>
      <td
        className="whitespace-nowrap px-6 py-4"
      >
        <button
          type="button"
          onClick={ () => deleteUser(id) }
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          data-testid={ `admin_manage__element-user-table-remove-${item}` }
        >
          Excluir
        </button>
      </td>
    </tr>
  );
}

UserRowTable.propTypes = {
  item: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.number.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

export default UserRowTable;
