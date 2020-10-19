import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import DashboardCreated from '../pages/DashboardCreated';
import DashboardPending from '../pages/DashboardPending';
import EditOrphanage from '../pages/EditOrphanage';
import VerifyOrphanage from '../pages/VerifyOrphanage';

const AppRoutes: React.FC = () => (
    <BrowserRouter  >
      <Switch>
        <Route path="/dashboardpending/:id" component={DashboardCreated} />
        <Route path="/dashboardcreated/:id" component={DashboardPending} />
        <Route path="/orphanages/edit/:id" component={EditOrphanage} />
        <Route path="/orphanages/verify/:id" component={VerifyOrphanage} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
);

export default AppRoutes;