import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, Redirect, hashHistory } from 'react-router-dom';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom';

import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () =><p>Page Not Found</p>;

const RoutedApp = () => (
  <Router>
    <div>
      <Redirect from="/" to="/issues" />
      <Route path="/issues" component={IssueList} />
      <Route path="/issues/:id" component={IssueEdit} />
      <Route path="*" component={NoMatch} />
    </div>  
  </Router>
);

ReactDOM.render(<RoutedApp />, contentNode);

if (module.hot) {
  module.hot.accept();
}