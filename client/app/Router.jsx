import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import {Home} from './components/home/Home';

export default (
  <Route history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
    </Route>
  </Route>
);