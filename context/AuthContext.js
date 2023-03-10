import { createContext, useState, useEffect } from 'react';
import {
  createCustomer,
  customerAccessTokenCreate,
  customerAccessTokenDelete,
  customerQuery,
  customerRecover,
} from '../lib/shopify';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [customer, setCustomer] = useState({});
  const [loggedIn, setLogin] = useState(false);

  useEffect(() => {
    if (localStorage.customer) {
      const customerObj = JSON.parse(localStorage.customer);

      if (customerObj.token) {
        setCustomer({ ...customerObj });
      }
    }
  }, []);

  async function orders(customerAccessToken) {
    const response = await customerQuery(customerAccessToken);
    const customerObj = {
      token: customerAccessToken,
      firstName: response.firstName,
      email: response.email,
    };
    setCustomer({ token: customerAccessToken, ...response });
    setLogin(true);

    localStorage.setItem('customer', JSON.stringify(customerObj));
    return {
      customer: response,
    };
  }

  async function register({ email, firstName, lastName, password }) {
    // create a new customer
    const { customer, customerUserErrors } = await createCustomer(
      email,
      password,
      firstName,
      lastName
    );
    console.log(customer);
    if (customer) {
      // create a mew token
      const token = await customerAccessTokenCreate(email, password);
      console.log(token);
      const customerObj = {
        token: token.accessToken,
        firstName,
        email,
      };
      setCustomer(customerObj);
      setLogin(true);
      localStorage.setItem('customer', JSON.stringify(customerObj));
      return {
        type: 'success',
        message: "Your account has been activated and you've been logged in",
      };
    } else {
      if (customerUserErrors.length > 0) {
        if (customerUserErrors[0].code === 'CUSTOMER_DISABLED') {
          // customer exist => usually guest checkout
          return {
            type: 'info',
            message: customerUserErrors[0].message,
          };
        }
      }
      // should show some kind of error?
    }
  }

  async function login({ email, password }) {
    const token = await customerAccessTokenCreate(email, password);
    if (token.accessToken) {
      const response = await customerQuery(token.accessToken);
      const customerObj = {
        token: token.accessToken,
        firstName: response.firstName,
        email: response.email,
        address: response.defaultAddress ? true : false,
      };
      setCustomer(customerObj);
      setLogin(true);
      localStorage.setItem('customer', JSON.stringify(customerObj));
      return {
        message: 'ok',
      };
    } else {
      //error?
    }
  }

  async function logout() {
    setLogin(false);
    if (localStorage.customer) {
      const customerObj = JSON.parse(localStorage.customer);

      if (customerObj.token) {
        await customerAccessTokenDelete(customerObj.token);
        setCustomer({});
        localStorage.setItem('customer', JSON.stringify({}));
        return {
          message: 'ok',
        };
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
        orders,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

const AuthConsumer = AuthContext.Consumer;

export { AuthConsumer, AuthContext };
