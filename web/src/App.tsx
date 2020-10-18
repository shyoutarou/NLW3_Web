import React from 'react';
import { ToastContainer } from 'react-toastify';

import './styles/global.css';
import 'react-toastify/dist/ReactToastify.css';

import Routes from './routes';
import { AuthProvider } from './contexts/auth';

function App() {
  return (
    <>
      <ToastContainer />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </>    
  );
}

export default App;
