import React, { Component } from 'react';
import { Field, reduxForm, propTypes, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Form, Message } from 'semantic-ui-react';
import * as actions from '../../../store/actions/index';
// import PropTypes from 'prop-types';

class SignUp extends Component {
  handleSignUp = async (values) => {
    await this.props.onAuth(values);

    // handle firebase error on reduxForm. if there is an error, code will not
    // pass this error handler
    if (Object.keys(this.props.authError).length > 0) {
      throw new SubmissionError({ _error: this.props.authError.message });
    }

    this.props.reset();
    this.props.history.push('/portfolio');
  }

  renderField = ({
    input, label, placeholder, type, meta: { touched, error, warning },
  }) => (
    <Form.Field>
      <Form.Input
        {...input}
        placeholder={placeholder}
        type={type}
        label={label}
        required
      />
      {
        touched && (
          (error && <Message color="red" size="mini">{error}</Message>)
          || (warning && <Message color="yellow" size="mini">{warning}</Message>)
        )
      }
    </Form.Field>
  );


  render() {
    const { handleSubmit, error: serverError } = this.props;

    return (
      <Container>
        <Form onSubmit={handleSubmit(this.handleSignUp)}>
          <Field
            name="emailSignUp"
            component={this.renderField}
            type="email"
            label="E-Mail"
            placeholder="Email@sample.com"
          />
          <Field
            name="usernameSignUp"
            component={this.renderField}
            type="text"
            label="Username"
            placeholder="My Username"
          />
          <Field
            name="passwordSignUp"
            component={this.renderField}
            type="password"
            label="Password"
            placeholder="Password"
          />
          <Form.Button disabled={this.invalid} primary type="submit">Sign Up</Form.Button>
          { !serverError ?
            null
            :
            <Message color="red" size="mini" >{serverError}</Message>
          }
        </Form>
      </Container>
    );
  }
}

// PropTypes here
SignUp.propTypes = {
  // Redux-form proptypes
  ...propTypes,
};

// validation front end.
const validate = (values) => {
  const errors = {};
  if (!values.emailSignUp) {
    errors.emailSignUp = 'User Email is Required';
  }

  if (!values.passwordSignUp) {
    errors.passwordSignUp = 'Please Enter Password';
  }

  if (!values.usernameSignUp) {
    errors.usernameSignUp = 'Please Enter a Username';
  }

  return errors;
};

const mapStateToProps = state => ({
  authError: state.auth.errors,
  isAuthenticated: state.auth.authenticated,
});

const mapDispatchToProps = dispatch => ({
  onAuth: values => dispatch(actions.auth(values)),
});

export default reduxForm({
  validate,
  // name the form component
  form: 'SignUpForm',
})(withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp)));
