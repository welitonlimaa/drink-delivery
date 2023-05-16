import React, { useContext, useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { isExpired } from 'react-jwt';
import AppContext from '../context/AppContext';
import logo from '../images/logo.png';
import dataValidate from '../utils/dataValidate';
import { requestLogin } from '../services/requests';
import routes from '../json/routes.json';
import takeaway from '../images/gifs/takeaway.gif';
import LoginForm from '../components/LoginForm';

function Login() {
  const { fields, setFormFields, userData, setUserData } = useContext(AppContext);
  const [isValid, setIsValid] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [unauthorized, changeAuthorized] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    try {
      const data = await requestLogin(
        '/login',
        { email: fields.email, password: fields.password },
      );
      setUserData(data);
      setIsLogged(true);
    } catch (error) {
      setIsValid(false);
      changeAuthorized(true);
      // console.log(error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const isTokenExpired = isExpired(user.token);
      setIsLogged(!isTokenExpired);
    }
  }, []);

  useEffect(() => {
    const data = dataValidate(fields);
    setIsValid((data.email && data.password));
  }, [fields]);

  const history = useHistory();
  const handleClick = (endpoint) => {
    history.push(endpoint);
  };

  if (isLogged) return <Redirect to={ `${routes[userData.role]}` } />;

  return (
    <>
      <header
        className="w-full h-16 bg-flamingo-500"
      >
        <img className="w-16" src={ logo } alt="logo" />
      </header>
      <div className="flex items-center justify-around w-full min-h-screen">
        <div className="w-1/3">
          <img className="w-full" src={ takeaway } alt="take away gif" />
        </div>
        <div className="flex justify-center font-normal">
          <h1>Login</h1>
          <LoginForm
            login={ login }
            handleClick={ handleClick }
            fields={ fields }
            setFormFields={ setFormFields }
            isValid={ isValid }
            unauthorized={ unauthorized }
          />
        </div>
      </div>
    </>
  );
}

export default Login;
