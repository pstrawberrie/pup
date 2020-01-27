/**
 * Index Container Component
 */

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom';

// Pages
import PottyTracker from '../../pages/PottyTracker/PottyTracker';
import About from '../../pages/About/About';

// Styles
import './Nav.scss';

export default class IndexContainer extends React.Component {
  /**
   * State
   */
  state = {
    data: {}
  }

  /**
   * Did Mount
   */
  componentDidMount() {
    // Get Initial State
    this.getInitialState();
  }

  /**
   * Get Initial Page Data
   */
  getInitialState() {
    //const rootEle = document.getElementById('index-root');

    // Get Servers Data
    // let serversData = rootEle.getAttribute('data-servers');
    // serversData = serversData ? JSON.parse(serversData) : [];

    // this.setState({servers: serversData});
  }

  render() {
    return (
      <Router>
        {/* Navigation */}
        <nav className="nav">
          <ul className="nav__main">
            <li>
              <NavLink exact to="/"
                       className="nav__main_link"
                       activeClassName="active">Potty Tracker</NavLink>
            </li>
            <li>
              <NavLink exact to="/about"
                       className="nav__main_link"
                       activeClassName="active">About</NavLink>
            </li>
          </ul>
        </nav>

        {/* Page Content */}
        <main id="main-content">
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <PottyTracker />
            </Route>
          </Switch>
        </main>
      </Router>
    );
  }
}
