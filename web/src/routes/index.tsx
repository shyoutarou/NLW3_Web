import React from 'react';
import AppRoutes from './AppRoutes';
import AuthRoutes from './AuthRoutes';
import { useAuth } from '../contexts/auth';

const Routes: React.FC = () => {
        const { signed } = useAuth();
        console.log(signed)
        return signed ? <AppRoutes/> : < AuthRoutes />;
  };
  
  export default Routes;