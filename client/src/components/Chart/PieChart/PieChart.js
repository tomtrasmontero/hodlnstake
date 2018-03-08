import React, { Component } from 'react';
import ReactHighChart from 'react-highcharts';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PieChart extends Component {
  componentDidMount() {
    if (this.pie) {
      // update chart to show ',' in total amount
      this.pie.Highcharts.setOptions({ lang: { thousandsSep: ',' } });
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.pieData.length === 0) {
      return false;
    }
    if (nextProps.marketValue === this.props.marketValue) {
      return false;
    }
    if (Object.keys(nextProps.marketValue).length === 0) {
      return false;
    }

    return true;
  }

  render() {
    let chart = (
      <div><p>No Data Available.  Please Add a Transaction</p></div>
    );
    // update amount to the current data and create chart once all data is available
    if (this.props.pieData.length > 0 && Object.keys(this.props.marketValue).length > 0 &&
        this.props.pieData.length === Object.keys(this.props.marketValue).length) {
      const pieFormattedData = [];
      this.props.pieData.forEach((coin) => {
        // dont return coin with 0 value; Format to fit chart
        const [name, coinAmount] = coin;
        if (coinAmount === 0) {
          return;
        }
        const currentMarketValue = (this.props.marketValue[name].USD * coinAmount).toFixed(2);

        pieFormattedData.push([name, currentMarketValue * 1]);
      });

      // create chart here
      const pieConfig = {
        title: {
          text: 'Portfolio Breakdown',
        },
        credits: false,
        tooltip: {
          pointFormat: '{series.name}: <b>$ {point.y:,1f}</b><br/><b>{point.percentage:.1f}%</b>',
        },
        loading: {
          hideDuration: 1000,
          showDuration: 1000,
        },
        thousandsSep: ',',
        series: [{
          type: 'pie',
          name: 'Asset',
          allowPointSelect: true,
          data: pieFormattedData,
          // associated with the chart data order
          keys: ['name', 'y', 'sliced'],
          dataLabels: {
            enabled: true,
            format: '<b>{point.percentage:.1f}%</b>',
            distance: -30,
            filter: {
              property: 'percentage',
              operator: '>',
              value: 5,
            },
          },
          yAxis: 1,
          showInLegend: true,
        }],
        responsive: {
          rules: [{
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              navigator: {
                enabled: false,
              },
              dataLabels: {
                enabled: false,
              },
            },
          }],
        },
      };

      chart = <ReactHighChart config={pieConfig} ref={(c) => { this.pie = c; }} />;
    }

    return chart;
  }
}

PieChart.propTypes = {
  pieData: PropTypes.arrayOf(PropTypes.array).isRequired,
  marketValue: PropTypes.shape(),
};

PieChart.defaultProps = {
  marketValue: {},
};

const mapStateToProps = state => ({
  pieData: state.transaction.pieData,
  marketValue: state.coin.coinMarketValue,
});

export default connect(mapStateToProps)(PieChart);
