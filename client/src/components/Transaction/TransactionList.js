import React, { Component } from 'react';
import { Table, Icon, Responsive, Button, Confirm } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { numFormat } from '../../store/utility';
import * as actions from '../../store/actions/index';
import ImageLoader from '../ImageLoader/ImageLoader';

class TransactionList extends Component {
  state = {
    confirmShow: false,
    id: '',
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.transactions !== this.props.transactions) {
      this.props.getMarketValue(nextProps.transactions);
    }
  }

  showConfirm(trxId) {
    this.setState({ confirmShow: true, id: trxId });
  }

  handleConfirm = () => {
    this.props.deleteTransaction(this.state.id);
    this.setState({ confirmShow: false, id: '' });
  }
  handleCancel = () => this.setState({ confirmShow: false, id: '' })

  render() {
    let list = <Table.Row><Table.Cell colSpan="16" textAlign="center">Add a Transaction</Table.Cell></Table.Row>;

    if (this.props.transactions.length > 0) {
      list = this.props.transactions.map((transaction) => {
        const e = new Date(transaction.transactionDate);
        const date = e.toLocaleString('en-US', { hour12: false });
        const imageUrl = `https://chasing-coins.com/api/v1/std/logo/${transaction.coinName}`;
        const image = <ImageLoader imageurl={imageUrl} avatar />;

        let currentValue = 0;
        // async calculation of marketValues
        if (Object.keys(this.props.marketValues).length > 0
        && this.props.marketValues[transaction.coinName]) {
          currentValue = this.props.marketValues[transaction.coinName].USD;
        }
        const totalMarketValue = (currentValue * transaction.coinAmount).toFixed(2);
        let type = 'BUY';
        let price = transaction.buyPrice;

        if (transaction.buyPrice === null) {
          type = 'SELL';
          price = transaction.sellPrice;
        }
        const initialcost = transaction.coinAmount * price;
        const delta = (((totalMarketValue - initialcost) / initialcost) * 100).toFixed(2);
        let statusIcon = <Icon name="long arrow down" size="large" color="red" />;
        if (delta > 0) {
          statusIcon = <Icon name="long arrow up" size="large" color="green" />;
        }

        return (
          <Table.Row key={transaction.id} >
            <Table.Cell>
              <Button
                icon="delete"
                circular
                onClick={() => this.showConfirm(transaction.id)}
              />
              <Confirm
                open={this.state.confirmShow}
                size="small"
                onCancel={this.handleCancel}
                onConfirm={this.handleConfirm}
                dimmer="blurring"
                content="Delete this Transaction?"
              />
            </Table.Cell>
            <Table.Cell>{image}{transaction.coin.cryptoCoinFullName}</Table.Cell>
            <Responsive as={Table.Cell} minWidth={768}>{date}</Responsive>
            <Responsive as={Table.Cell} minWidth={768}>{type}</Responsive>
            <Responsive as={Table.Cell} minWidth={768}>
              {numFormat(transaction.coinAmount)}
            </Responsive>
            <Responsive as={Table.Cell} minWidth={768}>${numFormat(price)}</Responsive>
            <Responsive as={Table.Cell} minWidth={768}>${numFormat(initialcost)}</Responsive>

            <Responsive as={Table.Cell} maxWidth={767}>
              ${numFormat((totalMarketValue / 1000).toFixed(2))}K
            </Responsive>
            <Responsive as={Table.Cell} minWidth={768}>
              ${numFormat(totalMarketValue)}
            </Responsive>

            <Responsive as={Table.Cell} maxWidth={767}>
              ${numFormat(((totalMarketValue - initialcost) / 1000).toFixed(2))}K {statusIcon}
            </Responsive>
            <Responsive as={Table.Cell} minWidth={768}>
              ${numFormat((totalMarketValue - initialcost).toFixed(2))} {statusIcon}
            </Responsive>

            <Table.Cell>{numFormat(delta)}% {statusIcon}</Table.Cell>
          </Table.Row>
        );
      });
    }

    return (
      <Table celled size="small" justified="true" compact selectable unstackable textAlign="center">
        <Table.Header inverted="true" fullWidth>
          <Table.Row>
            <Table.HeaderCell>Delete</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Responsive as={Table.HeaderCell} minWidth={768}>Date</Responsive>
            <Responsive as={Table.HeaderCell} minWidth={768}>Type</Responsive>
            <Responsive as={Table.HeaderCell} minWidth={768}>Amount</Responsive>
            <Responsive as={Table.HeaderCell} minWidth={768}>Price per Coin</Responsive>
            <Responsive as={Table.HeaderCell} minWidth={768}>Initial Cost</Responsive>
            <Table.HeaderCell>Market Value</Table.HeaderCell>
            <Table.HeaderCell>Delta USD</Table.HeaderCell>
            <Table.HeaderCell>Delta %</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {list}
        </Table.Body>
      </Table>
    );
  }
}

TransactionList.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  marketValues: PropTypes.shape(),
  getMarketValue: PropTypes.func.isRequired,
  deleteTransaction: PropTypes.func.isRequired,
};

TransactionList.defaultProps = {
  marketValues: {},
};

const mapStateToProps = state => ({
  marketValues: state.coin.coinMarketValue,
  authFirebaseUID: state.auth.firebaseUID,
});

const mapDispatchToProps = dispatch => ({
  getMarketValue: symbols => dispatch(actions.getMarketValues(symbols)),
  deleteTransaction: trxId => dispatch(actions.deleteTransaction(trxId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);
