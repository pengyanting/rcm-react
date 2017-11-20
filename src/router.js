import React from 'react';
import { Router, Route, Switch } from 'dva/router';

import Users from './routes/Users';
import Login from './routes/Login';
import IndexPage from './routes/IndexPage';
import UserGroup from './routes/UserGroup';
import Role from './routes/Role';
import Privilege from './routes/Privilege';
import Menu from './routes/Menu';
import System from './routes/System';

const PrimaryLayout = () => (
  <div className="primary-layout">
    <IndexPage>
      <main>
        <Route path="/" exact component={Users} />
        <Route path="/users" component={Users} />
        <Route path="/userGroup" component={UserGroup} />
        <Route path="/role" component={Role} />
        <Route path="/privilege" component={Privilege} />
        <Route path="/menu" component={Menu} />
        <Route path="/system" component={System} />
      </main>
    </IndexPage>
  </div>
);

export default function ({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" exact component={Login} />
        <PrimaryLayout />
      </Switch>
    </Router>
  );
}

