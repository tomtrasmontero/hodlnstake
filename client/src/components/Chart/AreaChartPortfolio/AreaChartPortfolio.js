import React, { Component } from 'react';
import ReactHighChart from 'react-highcharts';
import PropTypes from 'prop-types';

class AreaChart extends Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.data.length > 0) {
      return true;
    }
    return false;
  }

  render() {
    if (this.props.data.length > 0) {
      // add thousand ','
      const chart = this.area;
      if (chart) {
        chart.Highcharts.setOptions({ lang: { thousandsSep: ',' } });
      }

      // set minimum value of the chart to the lowest value of the array dataset
      let value = this.props.data[0][1];
      this.props.data.forEach((data) => {
        if (data[1] < value) {
          [, value] = data;
        }
      });
    }

    const areaConfig = {
      title: {
        text: 'Portfolio Performance',
      },
      yAxis: {
        title: {
          text: 'USD Price',
        },
        startOnTick: false,
        type: 'linear',
        min: 0,
        minPadding: 0.2,
      },
      xAxis: {
        type: 'datetime',
      },
      plotOptions: {
        area: {
          dataLabels: {
            enabled: false,
          },
          enableMouseTracking: true,
          animation: false,
        },
      },
      chart: {
        height: 200,
        animation: false,
      },
      credits: false,
      tooltip: {
        pointFormat: '<b>$ {point.y:,1f}</b><br/>',
      },
      loading: {
        hideDuration: 1000,
        showDuration: 1000,
      },
      series: [{
        type: 'area',
        name: 'Portfolio Value',
        data: this.props.data,
        showInLegend: false,
        marker: {
          enabled: false,
        },
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

    return (
      <ReactHighChart config={areaConfig} ref={(c) => { this.area = c; }} />
    );
  }
}

// PropTypes here
AreaChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default AreaChart;
