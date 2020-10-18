import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Landing from '../pages/Landing';
import OrphanagesMap from '../pages/OrphanagesMap';
import CreateOrphanage from '../pages/CreateOrphanage';
import Orphanage from '../pages/Orphanage';

const AppRoutes: React.FC = () => (
    <BrowserRouter  >
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={OrphanagesMap} />
        <Route path="/orphanages/create" component={CreateOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
);

export default AppRoutes;