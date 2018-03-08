import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Sidebar,
  Menu,
  Icon,
} from 'semantic-ui-react';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideBar.scss';

const sidebarLeftOverlay = props => (
  <Aux>
    <Backdrop
      clicked={props.clicked}
      visible={props.visible}
    />
    <Sidebar.Pushable as={Aux}>
      <Sidebar
        as={Menu}
        animation="overlay"
        width="thin"
        visible={props.visible}
        icon="labeled"
        vertical
        inverted
      >
        <Menu.Item
          name="home"
          as={Link}
          to="/home"
          onClick={props.clicked}
        >
          <Icon name="home" />
          Home
        </Menu.Item>

        <Menu.Item
          name="coins"
          as={Link}
          to="/coins"
          onClick={props.clicked}
        >
          <Icon name="bitcoin" />
            Coins
        </Menu.Item>

        {props.isAuthenticated
          ?
            <Aux>
              <Menu.Item
                name="portfolio"
                as={Link}
                to="/portfolio"
                onClick={props.clicked}
              >
                <Icon name="bar chart" />
                Portfolio
              </Menu.Item>
              <Menu.Item
                name="logout"
                as={Link}
                to="/home"
                onClick={props.logout}
              >
                <Icon name="sign out" />
                  Log Out
              </Menu.Item>
            </Aux>
          :
            <Menu.Item
              name="signup"
              as={Link}
              to="/signup"
              onClick={props.clicked}
            >
              <Icon name="sign in" />
              Sign In
            </Menu.Item>
        }

      </Sidebar>

      <Sidebar.Pusher className={classes.Sidebar} >
        {props.children}
      </Sidebar.Pusher>

    </Sidebar.Pushable>
  </Aux>
);

sidebarLeftOverlay.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.shape({}).isRequired,
  clicked: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

sidebarLeftOverlay.defaultProps = {
  visible: null,
};

export default sidebarLeftOverlay;
