import PropTypes from 'prop-types';
import UserRowTable from './UserRowTable';

function UsersTable({ users, deleteUser }) {
  return (
    <table className="min-w-full text-left text-lg font-light">
      <thead
        className="border-b font-medium dark:border-neutral-500"
      >
        <tr>
          <th scope="col" className="px-6 py-4">
            Item
          </th>
          <th scope="col" className="px-6 py-4">
            Nome
          </th>
          <th scope="col" className="px-6 py-4">
            E-mail
          </th>
          <th scope="col" className="px-6 py-4">
            Tipo
          </th>
          <th scope="col" className="px-6 py-4">
            Excluir
          </th>
        </tr>
      </thead>
      <tbody>
        {
          users.map(({ id, name, email, role }, index) => (
            <UserRowTable
              key={ index }
              item={ index }
              id={ id }
              name={ name }
              email={ email }
              role={ role }
              deleteUser={ () => deleteUser(id) }
            />))
        }
      </tbody>
    </table>
  );
}

UsersTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  deleteUser: PropTypes.func.isRequired,
};

export default UsersTable;
