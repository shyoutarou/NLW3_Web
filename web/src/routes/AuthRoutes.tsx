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
import CreateOrphanage_test from '../pages/CreateOrphanage';
import Orphanage from '../pages/Orphanage';
import CreateOrphanageSuccess from '../pages/CreateOrphanageSuccess';

const AuthRoutes: React.FC = () => (
    <BrowserRouter>
      <Switch>    
        <Route path="/" exact component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/signup" exact component={SignUp}/>
        <Route path='/signup-success' exact component={SignUpSuccess}  />
        <Route path="/reset-password/:id/:token" exact component={ResetPassword} />
        <Route path="/reset-password-success" exact component={ResetPasswordSuccess} />
        <Route path="/forgot-password" exact component={ForgotPassword} />
        <Route path='/forgot-password-success' exact component={ForgotPasswordSuccess} />
        <Route path="/app" component={OrphanagesMap} />
        <Route path="/orphanages/create" component={CreateOrphanage_test} />
        <Route path='/orphanage-success' exact component={CreateOrphanageSuccess}  />
        <Route path="/orphanages/:id" component={Orphanage} />     
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
);

export default AuthRoutes;