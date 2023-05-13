import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { isExpired } from 'react-jwt';
import RegisterForm from '../components/RegisterForm';
import AppContext from '../context/AppContext';
import { createUser, deleteData, requestData, setToken } from '../services/requests';
import clearLocalStorage from '../utils/clearLocalStorage';
import Header from '../components/Header';
import UsersTable from '../components/UsersTable';
import useForm from '../hooks/useForm';

function AdminManage() {
  const { userData } = useContext(AppContext);
  const [hasError, setError] = useState(false);
  const [isLogged, setIsLogged] = useState(true);
  const [users, setUsers] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [fields, setFormFields] = useForm({
    email: '',
    password: '',
    name: '',
    role: '',
  });

  const user = JSON.parse(localStorage.getItem('user'));

  const register = async (e) => {
    e.preventDefault();

    try {
      setToken(user.token);
      await createUser('/users/admin/register', fields);
      setError(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
    setUpdated(true);
  };

  const getUsersData = async () => {
    const data = await requestData('/users/');
    setUsers(data);
  };

  useEffect(() => {
    const isTokenExpired = isExpired(userData.token);
    setIsLogged(!isTokenExpired);
    if (userData.role !== 'administrator') {
      setIsLogged(false);
    } else {
      getUsersData();
    }
    if (updated) setUpdated(false);
  }, [updated]);

  if (!isLogged) {
    clearLocalStorage();
    return <Redirect to="/login" />;
  }

  const deleteUser = async (id) => {
    await deleteData(`/users/destroy/${id}`);
    setUpdated(true);
  };

  return (
    <>
      <Header />
      <div>
        {
          hasError ? (
            <p data-testid="admin_manage__element-invalid-register">
              Error
            </p>
          )
            : null
        }
      </div>
      <div className="my-14">
        <RegisterForm
          register={ register }
          fields={ fields }
          setFormFields={ setFormFields }
        />
      </div>
      <div className="flex flex-col overflow-x-auto">
        <UsersTable users={ users } deleteUser={ deleteUser } />
      </div>
    </>
  );
}

export default AdminManage;
