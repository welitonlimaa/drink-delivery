import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import useForm from '../hooks/useForm';
import useLocalStorage from '../hooks/useLocalStorage';

function AppProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useLocalStorage('user', {});
  const [fields, setFormFields] = useForm({
    email: '',
    password: '',
    name: '',
  });

  const values = useMemo(() => ({
    fields,
    setFormFields,
    isLoading,
    setIsLoading,
    userData,
    setUserData,
  }), [
    isLoading,
    fields,
    setFormFields,
    userData,
    setUserData,
  ]);

  return (
    <AppContext.Provider value={ values }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default AppProvider;
