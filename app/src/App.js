import React, { useEffect, useState } from 'react';

import { AuthContext, TokenContext } from './components/context'

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import LandingPage from './pages/LandingPage';
import './App.css';


function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

const getToken = () => {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken
}

function App() {

  const [userToken, setUserToken] = useState(getToken());

  const authContext = React.useMemo(() => ({
    signIn: async(userToken) => {
      setToken(userToken);
      setUserToken(userToken);
    },
    signOut: async() => {
      sessionStorage.clear();
      setUserToken('');
    }
  }), []);

  return (
    <AuthContext.Provider value={authContext}>
      <TokenContext.Provider value={userToken}>
        <Router>
            {userToken ? (
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                  </Routes>
            ) : 
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signUp" element={<SignUp />}/>
              </Routes>
            }
          </Router>
        </TokenContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
