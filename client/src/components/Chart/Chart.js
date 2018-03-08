import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import ReactHighstock from 'react-highcharts/ReactHighstock';
import PropTypes from 'prop-types';
import classes from './Chart.scss';

class Chart extends Component {
  componentDidMount() {
    this.chart.Highcharts.setOptions({ lang: { thousandsSep: ',' } });
  }

  render() {
    const areaData = this.props.dataSet[0];
    const barData = this.props.dataSet[1];
    const imageUrl = `https://chasing-coins.com/api/v1/std/logo/${this.props.symbol}`;

    const config = {
      rangeSelector: {
        selected: 1,
      },
      credits: false,
      title: {
        text: this.props.text,
      },
      chart: {
        plotBackgroundImage: imageUrl,
        className: classes.Image,
      },
      loading: {
        hideDuration: 1000,
        showDuration: 1000,
      },
      yAxis: [{
        labels: {
          align: 'right',
          x: -3,
        },
        title: {
          text: 'Price',
        },
        height: '60%',
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      }, {
        labels: {
          align: 'right',
          x: -3,
        },
        title: {
          text: 'Volume',
        },
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2,
      }],
      tooltip: {
        split: true,
      },
      series: [{
        name: this.props.symbol,
        data: areaData,
        tooltip: {
          valueDecimals: 3,
        },
      }, {
        type: 'area',
        name: 'volume',
        data: barData,
        tooltip: {
          valueDecimals: 3,
        },
        yAxis: 1,
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
          },
        }],
      },
    };


    return (
      <Container id="container" >
        <ReactHighstock config={config} ref={(c) => { this.chart = c; }} />
      </Container>
    );
  }
}

Chart.propTypes = {
  dataSet: PropTypes.arrayOf(PropTypes.array).isRequired,
  text: PropTypes.string,
  symbol: PropTypes.string,
};

Chart.defaultProps = {
  text: '',
  symbol: '',
};

export default Chart;
