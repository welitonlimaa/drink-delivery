import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import useForm from '../hooks/useForm';

function AppProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [fields, setFormFields] = useForm({
    email: '',
    password: '',
    completeName: '',
  });

  const values = useMemo(() => ({
    fields,
    setFormFields,
    isLoading,
    setIsLoading,
  }), [
    isLoading,
    fields,
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
