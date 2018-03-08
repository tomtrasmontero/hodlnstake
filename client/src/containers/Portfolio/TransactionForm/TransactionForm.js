import React, { Component } from 'react';
import { Field, reduxForm, propTypes } from 'redux-form';
import { connect } from 'react-redux';
import { Form, Message, Button, Segment, Tab, Header, Container } from 'semantic-ui-react';
import * as actions from '../../../store/actions/index';

class TransactionForm extends Component {
  state = {
    error: {},
  }

  componentDidMount() {
    this.props.getList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authError !== this.state.error) {
      this.setState({ error: nextProps.authError });
    }
  }

  addTransactionHandler = async (values) => {
    // update marketValue on first transaction
    const data = { ...values, firebaseUID: this.props.firebaseUID };
    await this.props.addTransaction(data);

    this.props.reset();
  }

  searchCoin = (symbol) => {
    let doesCoinExist = false;
    const match = this.props.list.filter((coin) => {
      const matchName = coin.name.toUpperCase().includes(symbol.toUpperCase());
      return matchName;
    });

    if (match.length > 0) {
      doesCoinExist = true;
    }

    return doesCoinExist;
  };

  resetForm = () => {
    this.props.reset();
  }

  renderField = ({
    placeholder, pattern, input, label, type, meta: { touched, error, warning },
  }) => (
    <Form.Field>
      <Form.Input
        {...input}
        required
        fluid
        label={label}
        type={type}
        placeholder={placeholder}
        pattern={pattern}
      />
      {
        touched && (
          (error && <Message color="red" size="mini" content={error} />)
          || (warning && <Message color="yellow" size="mini" content={warning} />)
        )
      }
    </Form.Field>
  );

  render() {
    let errorMessage = null;
    if (Object.keys(this.state.error).length > 0) {
      errorMessage = (
        <Message
          inverted="true"
          color="red"
          size="small"
        >
          {this.state.error}
        </Message>
      );
    }

    const { handleSubmit, error } = this.props;
    const buyForm = (
      <Form onSubmit={handleSubmit(this.addTransactionHandler)}>
        <Form.Group widths="equal">
          <Field name="coinName" component={this.renderField} type="input" label="Symbol" />
          <Field name="buyPrice" component={this.renderField} type="number" label="Price" />
          <Field name="coinAmount" component={this.renderField} type="number" label="Amount" />
          <Field
            name="date"
            component={this.renderField}
            type="date"
            label="Transaction Date"
            placeholder="MMDDYYYYHHMM"
          />
          <Field
            name="time"
            component={this.renderField}
            type="time"
            label="Transaction Time"
            placeholder="HHMM"
          />
        </Form.Group>
        <Container textAlign="center">
          <Button positive type="submit" >Add Buy Transaction</Button>
          {!error ? null : <Message color="red" size="mini" header={error} />}
        </Container>
      </Form>
    );

    const sellForm = (
      <Form onSubmit={handleSubmit(this.addTransactionHandler)}>
        <Form.Group widths="equal">
          <Field name="coinName" component={this.renderField} type="input" label="Symbol" />
          <Field name="sellPrice" component={this.renderField} type="number" label="Price" />
          <Field name="coinAmount" component={this.renderField} type="number" label="Amount" />
          <Field
            name="date"
            component={this.renderField}
            type="date"
            label="Transaction Date"
            placeholder="MMDDYYYY"
          />
          <Field
            name="time"
            component={this.renderField}
            type="time"
            label="Transaction Time"
            placeholder="HHMM"
          />
        </Form.Group>
        <Container textAlign="center" >
          <Button negative type="submit" >Add Sell Transaction</Button>
          {!error ? <Message error header={error} /> : null}
        </Container>
      </Form>
    );

    const panes = [
      { menuItem: 'Buy', render: () => <Tab.Pane color="green">{buyForm}</Tab.Pane> },
      { menuItem: 'Sell', render: () => <Tab.Pane color="red">{sellForm}</Tab.Pane> },
    ];

    return (
      <Segment color="black" raised >
        <Header textAlign="center" >Enter Transaction</Header>
        <Tab
          onTabChange={this.resetForm}
          menu={{
            fluid: true,
            widths: 2,
            pointing: true,
            inverted: true,
            color: 'grey',
          }}
          panes={panes}
        />
        { errorMessage }
      </Segment>
    );
  }
}

// PropTypes here
TransactionForm.propTypes = {
  // Redux-form proptypes
  ...propTypes,
};


// validation front end.
const validate = (values) => {
  const errors = {};
  if (!values.coinName) {
    errors.coinName = 'Please Enter Coin';
  }

  if (!values.buyPrice) {
    errors.buyPrice = 'Please Enter the Price per Coin';
  }

  if (!values.date) {
    errors.date = 'Please Enter a Date';
  }

  if (new Date(values.date) > new Date()) {
    errors.date = 'Invalid Date';
  }

  if (!values.time) {
    errors.time = 'Please Enter the Time';
  }

  if (!values.sellPrice) {
    errors.sellPrice = 'Please Enter the Price per Coin';
  }

  if (!values.coinAmount) {
    errors.coinAmount = 'Please Enter an amount';
  }

  return errors;
};


const mapStateToProps = state => ({
  authError: state.transaction.error,
  isAuthenticated: state.auth.authenticated,
  list: state.coin.coinSearchList,
  firebaseUID: state.auth.firebaseUID,
});

const mapDispatchToProps = dispatch => ({
  addTransaction: values => dispatch(actions.addTransaction(values)),
  getList: () => dispatch(actions.getCoinList()),
  getMarketValue: symbols => dispatch(actions.getMarketValues(symbols)),
});

export default reduxForm({
  validate,
  // name the form component
  form: 'transactionForm',
})(connect(mapStateToProps, mapDispatchToProps)(TransactionForm));
