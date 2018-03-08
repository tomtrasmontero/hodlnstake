import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import Aux from './hoc/Aux/Aux';

import HomePage from './containers/HomePage/HomePage';
import Coins from './containers/Coins/Coins';
import Coin from './containers/Coins/Coin/Coin';
import SignUpForm from './containers/SignUp/SignUpForm';
import Portfolio from './containers/Portfolio/Portfolio';
import About from './components/About/About';
import Contact from './containers/Contact/Contact';

class App extends Component {
  componentDidMount() {
    this.props.checkState();
  }

  render() {
    const routes = (
      <Switch>
        <Route path="/home" exact component={HomePage} />
        <Route path="/coins" exact component={Coins} />
        <Route path="/signup" exact component={SignUpForm} />
        <Route path="/portfolio" exact component={Portfolio} />
        <Route path="/about" exact component={About} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/coins/detail/:coinSymbol" component={Coin} />
        <Redirect to="/home" />
      </Switch>
    );

    return (
      <Aux>
        <Layout isAuthenticated={this.props.authenticated}>
          {routes}
        </Layout>
      </Aux>
    );
  }
}

App.propTypes = {
  checkState: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = dispatch => ({
  checkState: () => dispatch(actions.authCheckState()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
