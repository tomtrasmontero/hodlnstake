import React, { Component } from 'react';
import { Menu, Responsive, Icon, Image } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import classes from './Toolbar.scss';
import Logo from '../../../assets/logoCoin.png';

import Aux from '../../../hoc/Aux/Aux';

class Toolbar extends Component {
  state = {
    activeItem: '',
  };

  componentDidMount = () => {
    const activeAddress = this.props.history.location.pathname.split('/')[1];
    this.setState({ activeItem: activeAddress });
  }

  handleItemClick = (e, data) => {
    // logout
    if (data.name === 'logout') {
      this.props.logout();
      this.setState({ activeItem: 'home' });
    } else {
      this.setState({ activeItem: data.name });
    }

    this.props.history.push(data.address);
  };


  render() {
    const { activeItem } = this.state;
    let authenticatedRoutes = null;
    if (this.props.authenticated) {
      authenticatedRoutes = (
        <Responsive
          address="/portfolio"
          as={Menu.Item}
          minWidth={768}
          name="portfolio"
          active={activeItem === 'portfolio'}
          onClick={this.handleItemClick}
        />
      );
    }

    const toolbar = (
      <Menu pointing secondary size="massive" className={classes.Toolbar} >
        {/* mobile toolbar */}
        <Responsive
          as={Menu.Item}
          maxWidth={767}
          name="menu"
          onClick={this.props.clicked}
          icon
        >
          <Icon size="large" name="ellipsis vertical" />
        </Responsive>
        <Responsive
          as={Menu.Item}
          maxWidth={767}
          position="right"
          className={classes.LogoMobile}
        >
          <Image src={Logo} size="mini" />
        </Responsive>

        <Responsive
          address="/"
          as={Menu.Item}
          minWidth={768}
          name="home"
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        />
        <Responsive
          address="/coins"
          as={Menu.Item}
          minWidth={768}
          name="coins"
          active={activeItem === 'coins'}
          onClick={this.handleItemClick}
        />

        {authenticatedRoutes}

        <Responsive
          as={Menu.Item}
          minWidth={768}
          position="right"
          className={classes.Logo}
        >
          <div>
            <strong>Hodl & Stake
              <Image src={Logo} size="mini" />
            </strong>
          </div>
        </Responsive>
        {this.props.authenticated
          ?
            <Responsive
              address="/"
              as={Menu.Item}
              minWidth={768}
              position="right"
              name="logout"
              onClick={this.handleItemClick}
            />
          :
            <Responsive
              address="/signup"
              as={Menu.Item}
              minWidth={768}
              position="right"
              name="sign in"
              active={activeItem === 'sign in'}
              onClick={this.handleItemClick}
            />
        }
      </Menu>
    );

    return (
      <Aux>
        { toolbar }
      </Aux>
    );
  }
}

Toolbar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  clicked: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.authLogout()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Toolbar));
