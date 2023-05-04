import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [completeName, setCompleteName] = useState('');

  const values = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
    completeName,
    setCompleteName,
    isLoading,
    setIsLoading,
  }), [
    isLoading,
    email,
    password,
    completeName,
  ]);

  return (
    <AppContext.Provider value={ values }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default AppProvider;
