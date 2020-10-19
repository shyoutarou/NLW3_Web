import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Landing from '../pages/Landing';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import SignUpSuccess from '../pages/SignUpSuccess';
import ForgotPassword from '../pages/ForgotPassword';
import ForgotPasswordSuccess from '../pages/ForgotPasswordSuccess';
import ResetPassword from '../pages/ResetPassword';
import ResetPasswordSuccess from '../pages/ResetPasswordSuccess';
import OrphanagesMap from '../pages/OrphanagesMap';
import CreateOrphanage from '../pages/CreateOrphanage';
import Orphanage from '../pages/Orphanage';
import Default from '../pages/Default';

const AuthRoutes: React.FC = () => (
    <BrowserRouter>
      <Switch>    
        <Route path="/" exact component={Landing} />
        <Route path="/default" exact component={Default} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" component={SignUp}/>
        <Route path='/signup-success' exact component={SignUpSuccess}  />
        <Route path="/reset-password/:id/:token" component={ResetPassword} />
        <Route path="/reset-password-success" exact component={ResetPasswordSuccess} />
        <Route path="/forgot-password" exact component={ForgotPassword} />
        <Route path='/forgot-password-success' exact component={ForgotPasswordSuccess} />
        <Route path="/app" component={OrphanagesMap} />
        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />        
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
);

export default AuthRoutes;