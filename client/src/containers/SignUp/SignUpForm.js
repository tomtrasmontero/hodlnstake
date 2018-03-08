import React from 'react';
import { connect } from 'react-redux';
import { Container, Tab, Segment } from 'semantic-ui-react';
import * as actions from '../../store/actions/index';
import LogIn from './LogIn/Login';
import SignUp from './SignUp/SignUp';
import classes from './SignUpForm.scss';

const signUpForm = () => {
  const panes = [
    {
      menuItem: 'Sign Up',
      render: () => (
        <Tab.Pane className={classes.MenuForm}>
          <SignUp />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Log In',
      render: () => (
        <Tab.Pane className={classes.MenuForm}>
          <LogIn />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Container textAlign="center" className={classes.Form}>
      <Segment raised className={classes.Menu} >
        <p>Use below credentials if you do not want to sign up!</p>
        <p>email: test1@test.com, pass: 123123</p>
        <Tab
          panes={panes}
          menu={{
            attached: true,
            widths: 2,
            pointing: true,
            className: classes.MenuItem,
            color: 'green',
          }}
        />
      </Segment>
    </Container>
  );
};


const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.authLogout()),
});

export default connect(null, mapDispatchToProps)(signUpForm);
