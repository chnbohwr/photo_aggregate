import React from 'react';
// import package
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import 'ress/dist/ress.min.css';

// import relative path
import Home from './Home';
import NotFound from './NotFound';
import PointMaker from './PointMaker';

const Main = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={PointMaker} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default Main;
