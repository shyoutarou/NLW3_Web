import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import DashboardCreated from '../pages/DashboardCreated';
import DashboardPending from '../pages/DashboardPending';
import DeleteSuccess from '../pages/DeleteSuccess';
import EditOrphanage from '../pages/EditOrphanage';
import NotFound from '../pages/NotFound';
import VerifyOrphanage from '../pages/VerifyOrphanage';

const AppRoutes: React.FC = () => (
    <BrowserRouter  >
      <Switch>
        <Route path="/" exact component={DashboardCreated} />
        <Route path="/delete-success" exact component={DeleteSuccess} />        
        <Route path="/dashboardpending/:id" component={DashboardPending} />
        <Route path="/dashboardcreated/:id" component={DashboardCreated} />
        <Route path="/orphanages/edit/:id" component={EditOrphanage} />
        <Route path="/orphanages/verify/:id" component={VerifyOrphanage} />
        <Route path="/loginerror" component={NotFound} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
);

export default AppRoutes;