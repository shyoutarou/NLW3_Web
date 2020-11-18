import React from 'react';
import { ToastContainer } from 'react-toastify';

import './styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

import Routes from './routes';
import { AuthProvider } from './contexts/auth';
import { LocalProvider } from './contexts/local';

function App() {
  return (
    <>
      <ToastContainer />
      <LocalProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </LocalProvider>
    </>    
  );
}

export default App;
