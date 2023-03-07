import { createContext, useState, useEffect } from 'react';
import {
  createCustomer,
  customerAccessTokenCreate,
  customerAccessTokenDelete,
  customerQuery,
} from '../lib/shopify';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [customer, setCustomer] = useState({});
  const [loggedIn, setLogin] = useState(false);

  useEffect(() => {
    if (localStorage.customer) {
      const customerObj = JSON.parse(localStorage.customer);

      if (customerObj.customerAccessToken) {
        setCustomer({ ...customerObj });
      }
    }
  }, []);

  async function register({ email, firstName, lastName, password }) {
    // create a new customer
    const response = await createCustomer(email, password, firstName, lastName);
    console.log(response);
    if (response.id) {
      // create a mew token
      const token = await customerAccessTokenCreate(email, password);
      console.log(token);
      const customerObj = {
        customerAccessToken: token.accessToken,
        firstName,
        email,
      };
      setCustomer(customerObj);
      setLogin(true);
      localStorage.setItem('customer', JSON.stringify(customerObj));
      return {
        message: 'ok',
      };
    } else {
      // should show some kind of error?
    }
  }

  async function login({ email, password }) {
    const token = await customerAccessTokenCreate(email, password);
    if (token.accessToken) {
      const response = await customerQuery(token.accessToken);
      const customerObj = {
        customerAccessToken: token.accessToken,
        firstName: response.firstName,
        email: response.email,
      };
      setCustomer(customerObj);
      setLogin(true);
      localStorage.setItem('customer', JSON.stringify(customerObj));
    } else {
      //error?
    }
  }

  async function logout() {
    setLogin(false);
    if (localStorage.customer) {
      const customerObj = JSON.parse(localStorage.customer);

      if (customerObj.customerAccessToken) {
        await customerAccessTokenDelete(checkoutId, updatedCart);
        setCustomer({});

        localStorage.setItem('customer', JSON.stringify({}));
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        logout,
        customer,
        register,
        login,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

const AuthConsumer = AuthContext.Consumer;

export { AuthConsumer, AuthContext };
