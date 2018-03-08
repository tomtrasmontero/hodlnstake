import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import AreaChartPortfolio from '../../Chart/AreaChartPortfolio/AreaChartPortfolio';

class TransactionPerformance extends Component {
  state = {
    transactions: [],
    chartData: [],
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.marketValue).length !== 0 && nextProps.transactions.length > 0) {
      this.setState({
        transactions: nextProps.transactions,
      }, async () => {
        const dataArray = await this.combineData();
        this.aggregateChartData(dataArray);
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.chartData.length > 0) {
      return true;
    }
    return false;
  }

  getDayHistory = async (symbol, days) => {
    const url = `https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=USD&limit=${days}&e=CCCAGG`;
    const request = await axios.get(url);
    return request.data;
  }

  combineData = () => {
    const currentDate = new Date();
    // get areachart data for each trx
    const aggregateData = this.state.transactions.map(async (trx) => {
      const timeDifference = currentDate - new Date(trx.transactionDate);
      const numberDaysSinceTrx = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

      // sell will decrease total amount of portfolio
      let trxAmount = trx.coinAmount;
      if (trx.buyPrice === null) {
        trxAmount *= -1;
      }
      // get data history for transactions
      const dataHistory = await this.getDayHistory(trx.coinName, numberDaysSinceTrx);
      return { ...dataHistory, trxAmount };
    });

    // this.setState({ summaryData: aggregateData });
    return aggregateData;
  }

  aggregateChartData = (dataArray) => {
    const data = [];
    const chartData = {};
    // get time series history of each trx
    Promise.all(dataArray)
      .then((result) => {
        result.forEach((day) => {
          const trxChart = this.createChartData(day);
          data.push(trxChart);
        });
      })
      .then(() => {
        // combine each trx into one chart dataset, time in millisecond
        data.forEach((trx) => {
          const keys = Object.keys(trx);
          keys.forEach((time) => {
            const timeInMilli = time * 1000;
            if (!chartData[timeInMilli]) {
              chartData[timeInMilli] = trx[time];
            } else {
              chartData[timeInMilli] += trx[time];
            }
          });
        });
        // convert millisecond string into number & sort for chart to work
        const rawData = Object.entries(chartData).sort((a, b) => a[0] - b[0]);
        const chartDataFormatted = rawData.map(entry => [(entry[0] * 1),
          (entry[1].toFixed(2) * 1)]);

        this.setState({ chartData: chartDataFormatted });
      });
  }

  createChartData = (trxObject) => {
    const dataByDays = {};
    const coinAmount = trxObject.trxAmount;
    trxObject.Data.forEach((day) => {
      if (!dataByDays[day.time]) {
        dataByDays[day.time] = coinAmount * day.close;
      } else {
        dataByDays[day.time] += coinAmount * day.close;
      }
    });
    return dataByDays;
  }


  render() {
    return (
      <AreaChartPortfolio data={this.state.chartData} />
    );
  }
}

TransactionPerformance.propTypes = {
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

export default connect(mapStateToProps)(TransactionPerformance);
