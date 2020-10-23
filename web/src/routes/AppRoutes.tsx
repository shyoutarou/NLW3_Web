import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import ApprovedList from '../pages/ApprovedList';
import PendingList from '../pages/PendingList';
import DeleteSuccess from '../pages/DeleteSuccess';
import EditOrphanage from '../pages/EditOrphanage';
import NotFound from '../pages/NotFound';
import VerifyOrphanage from '../pages/VerifyOrphanage';

const AppRoutes: React.FC = () => (
    <BrowserRouter  >
      <Switch>
        <Route path="/" exact component={ApprovedList} />
        <Route path="/delete-success" exact component={DeleteSuccess} />        
        <Route path="/pendinglist" component={PendingList} />
        <Route path="/approvedlist/:id" component={ApprovedList} />
        <Route path="/orphanages/edit/:id" component={EditOrphanage} />
        <Route path="/orphanages/verify/:id" component={VerifyOrphanage} />
        <Route path="/loginerror" component={NotFound} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
);

export default AppRoutes;