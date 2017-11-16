import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Users from './routes/Users';
import Login from './routes/Login';
import IndexPage from './routes/IndexPage';

const PrimaryLayout = () => (
  <div className="primary-layout">
    <IndexPage>
      <main>
        <Route path="/" exact component={Users} />
        <Route path="/users" component={Users} />
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

