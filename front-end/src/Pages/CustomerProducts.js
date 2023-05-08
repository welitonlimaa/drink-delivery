import { useContext, useEffect, useState } from 'react';
import { isExpired } from 'react-jwt';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Cart from '../components/Cart';
import Header from '../components/Header';
import Products from '../components/Products';
import AppContext from '../context/AppContext';
import clearLocalStorage from '../utils/clearLocalStorage';

function CustomerProducts() {
  const { userData } = useContext(AppContext);
  const [isLogged, setIsLogged] = useState(true);

  useEffect(() => {
    const isTokenExpired = isExpired(userData.token);
    setIsLogged(!isTokenExpired);
  }, []);

  if (!isLogged) {
    clearLocalStorage();
    return <Redirect to="/login" />;
  }

  return (
    <main>
      <Header />
      <Products />
      <Cart />
    </main>
  );
}

export default CustomerProducts;
