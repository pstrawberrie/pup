/**
 * Index Container Component
 */

import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

// Components
import Loader from '../../common/Loader/Loader';

// Pages
import Schedule from '../../pages/Schedule/Schedule';
import About from '../../pages/About/About';

// Styles
import './Nav.scss';

export default class IndexContainer extends React.Component {
  /**
   * State
   */
  state = {
    loading: false,
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

  /**
   * Show/Hide Loader
   */
  showLoader = (directive) => {
    if(typeof directive !== 'boolean') directive = false;
    this.setState({loading: directive});
  }

  render() {
    return (
      <Router>
        {/* Navigation */}
        <nav className="nav">
          <div className="nav__inner container">
            <ul className="nav__main">
              <li>
                <NavLink exact to="/"
                        className="nav__main_link"
                        activeClassName="active">Schedule</NavLink>
              </li>
              <li>
                <NavLink exact to="/about"
                        className="nav__main_link"
                        activeClassName="active">About</NavLink>
              </li>
            </ul>
          </div>
        </nav>

        {/* Page Content */}
        <main id="main-content">
          <Switch>
            <Route path="/about"
                   render={() => <About  />}>
            </Route>
            <Route path="/"
                   render={() => <Schedule showLoader={this.showLoader} />}>
            </Route>
          </Switch>
        </main>
        <CSSTransition
          in={this.state.loading}
          timeout={160}
          classNames={{
            enter: 'anim-enter',
            enterDone: 'anim-enter-done',
            exit: 'anim-exit',
            exitDone: 'anim-exit-done'
          }}>
          <Loader />
        </CSSTransition>
      </Router>
    );
  }
}
