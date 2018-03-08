import React, { Component } from 'react';
import { List, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { numFormat } from '../../../store/utility';

class TransactionSnapShot extends Component {
  state = {
    totalPortfolioValue: 0,
    totalCost: 0,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.transactions.length > 0 &&
      Object.keys(nextProps.marketValue).length > 0 &&
      nextProps.marketValue !== this.props.marketValue
    ) {
      let totalPortfolioValue = 0;
      let totalCost = 0;

      nextProps.transactions.forEach((trx) => {
        const currentValue = nextProps.marketValue[trx.coinName].USD;
        totalPortfolioValue += (currentValue * trx.coinAmount);

        if (trx.buyPrice === null) {
          totalCost -= (trx.sellPrice * trx.coinAmount);
        } else {
          totalCost += (trx.buyPrice * trx.coinAmount);
        }
      });
      this.setState({
        totalCost,
        totalPortfolioValue,
      });
    }
  }

  render() {
    const { totalPortfolioValue, totalCost } = this.state;
    const profitLoss = totalPortfolioValue - totalCost;
    const profitLossPer = ((totalPortfolioValue - totalCost) / totalCost) * 100;
    return (
      <List as={Container}>
        <List.Item>
          Current Market Value
          <List.Header>${numFormat(totalPortfolioValue.toFixed(2))}</List.Header>
        </List.Item>
        <List.Item>
          Total Cost
          <List.Header>${numFormat(totalCost.toFixed(2))}</List.Header>
        </List.Item>
        <List.Item>
          Profit/Loss USD
          <List.Header>${numFormat(profitLoss.toFixed(2))}</List.Header>
        </List.Item>
        <List.Item>
          Profit/Loss Perct.
          <List.Header>{numFormat(profitLossPer.toFixed(2))}%</List.Header>
        </List.Item>
        <List.Item>
          Realized Profit/Loss
          <List.Header>{numFormat(profitLossPer.toFixed(2))}%</List.Header>
        </List.Item>
      </List>
    );
  }
}

TransactionSnapShot.propTypes = {
  marketValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  transactions: state.transaction.transactions,
  marketValue: state.coin.coinMarketValue,
});


export default connect(mapStateToProps)(TransactionSnapShot);
