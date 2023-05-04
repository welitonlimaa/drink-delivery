import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider( { children } ) {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');

  const values = useMemo(() => ({
    email,
    setEmail,
    isLoading,
    setIsLoading,
  }), [
    isLoading,
    email,
  ])

  return (
    <AppContext.Provider value={ values }>
      { children }
    </AppContext.Provider>
  )
}

AppProvider.propTypes = {
  children: PropTypes.shape({}),
};

export default AppProvider;
