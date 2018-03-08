import React, { Component } from 'react';
import { Container, Segment, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TransactionForm from './TransactionForm/TransactionForm';
import * as actions from '../../store/actions/index';
import TransactionList from '../../components/Transaction/TransactionList';
import Aux from '../../hoc/Aux/Aux';
import PortfolioSummary from '../Portfolio/PortfolioSummary/PortfolioSummary';

class Portfolio extends Component {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.getTransactions(this.props.firebaseUID);
    }
  }

  componentWillReceiveProps(nextProps) {
    // update if there is any authenticated user
    if (nextProps.firebaseUID !== this.props.firebaseUID && nextProps.isAuthenticated) {
      nextProps.getTransactions(nextProps.firebaseUID);
    }
  }

  render() {
    let summary = (
      <Container textAlign="center" >
        <Message>No Data to analyze!</Message>
      </Container>
    );
    if (this.props.transactionList.length > 0) {
      summary = <PortfolioSummary />;
    }
    return (
      <Aux>
        {summary}
        <Container>
          <TransactionForm firebaseUID={this.props.firebaseUID} />
        </Container>
        <Container as={Segment.Group} raised>
          <TransactionList transactions={this.props.transactionList} />
        </Container>
      </Aux>
    );
  }
}

// PropTypes
Portfolio.propTypes = {
  getTransactions: PropTypes.func.isRequired,
  firebaseUID: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  transactionList: PropTypes.arrayOf(PropTypes.object).isRequired,
};


const mapStateToProps = state => ({
  isAuthenticated: state.auth.authenticated,
  transactionList: state.transaction.transactions,
  firebaseUID: state.auth.firebaseUID,
});

const mapDispatchToProps = dispatch => ({
  getTransactions: firebaseUID => dispatch(actions.getTransactions(firebaseUID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
