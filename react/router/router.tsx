import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { GlobalStyle } from '../theme';
import firebase from 'firebase';
import 'firebase/auth';
import { createContext } from 'react';
import { useState } from 'react';
import { Home, Login, NotFound } from '../pages';
import { AxiosPromise } from 'axios';

export interface AuthenticationResult {
  access_token: string;
  organization_id: string;
  persona_id: string;
  refresh_token: string;
  user_id: string;
}

const axiosBase = require('axios');
const axios = axiosBase.create({
  baseURL: 'https://edge.bitkey.tokyo/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

export const Auth = {
  isAuthenticated: false,
  login(form): Promise<AxiosPromise<AuthenticationResult>> {
    const data = JSON.stringify(form);
    return new Promise((resolve, reject) => {
      axios
        .post('/users/auth', data)
        .then((res) => {
          console.log('res', res);
          resolve(res);
        })
        .catch((err) => {
          console.warn(err);
          reject(err);
        });
    });
  },
};

export const useProvideAuth = () => {
  const [user, setUser] = useState<string | null>();

  const login = async (username: string, password: string) => {
    const body = {
      email: username,
      password,
      mail_template: 'app',
      phone: '',
    };
    const res = await Auth.login(body);

    firebase.auth().signInWithCustomToken(res.data.access_token);
    setUser(res.data.user_id);
    sessionStorage.setItem('user_id', res.data.user_id);
    return res;
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    login,
    logout,
  };
};

interface S {
  user: string | null | undefined;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<Partial<S>>({});

const Private = ({ children, ...rest }) => {
  const auth = useContext(AuthContext);
  const onSession = sessionStorage.getItem('user_id');
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user || !!onSession ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const App: React.FC = () => {
  return (
    <ProvideAuth>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Private exact path='/'>
            <Home />
          </Private>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </ProvideAuth>
  );
};

export default App;
