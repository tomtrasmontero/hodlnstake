import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { Container, Divider, Segment, Breadcrumb, Grid, Responsive } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/index';
import Chart from '../../../components/Chart/Chart';
import CoinSummary from '../../../components/CoinSummary/CoinSummary';
import Aux from '../../../hoc/Aux/Aux';
import classes from './Coin.scss';

class Coin extends Component {
  componentDidMount() {
    this.props.getCoinDetail(this.props.match.params.coinSymbol);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.chartData.length === 0 || Object.keys(nextProps.coinDetail).length === 0) {
      return false;
    }
    return true;
  }

  render() {
    const coinDescription = ReactHtmlParser(this.props.coinDetail.Description);
    return (
      <Aux>
        <Container fluid >
          <Grid columns={16}>
            <Responsive as={Grid.Column} columns={1} minWidth={768} />
            <Breadcrumb size="large" className={classes.Breadcrumb}>
              <Breadcrumb.Section
                as={Link}
                to="/coins"
                link
              >Coin Explorer
              </Breadcrumb.Section>
              <Breadcrumb.Divider icon="right chevron" />
              <Breadcrumb.Section active>{this.props.match.params.coinSymbol}</Breadcrumb.Section>
            </Breadcrumb>
          </Grid>
        </Container>
        <br />
        <Container>
          <Chart
            dataSet={this.props.chartData}
            text={this.props.coinDetail.H1Text}
            symbol={this.props.match.params.coinSymbol}
          />
          <Divider />

          <Segment>
            <CoinSummary
              coinData={this.props.coinDetail}
              symbol={this.props.match.params.coinSymbol}
            />
          </Segment>

          <Segment >
            <Container text>
              {coinDescription}
              {this.props.coinDetail.Feature}
            </Container>
          </Segment>
        </Container>
      </Aux>
    );
  }
}

// PropTypes here
Coin.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      coinSymbol: PropTypes.string,
    }),
  }).isRequired,
  getCoinDetail: PropTypes.func.isRequired,
  coinDetail: PropTypes.shape({
    Description: PropTypes.string,
    Feature: PropTypes.string,
    ImageUrl: PropTypes.string,
    H1Text: PropTypes.string,
    Symbol: PropTypes.string,
  }).isRequired,
  chartData: PropTypes.arrayOf(PropTypes.array),
};

Coin.defaultProps = {
  chartData: [],
};

const mapStateToProps = state => ({
  coinDetail: state.coin.coinDetail,
  chartData: state.coin.coinChartData,
});

const mapDispatchToProps = dispatch => ({
  getCoinDetail: symbol => dispatch(actions.getCryptoCoinDetail(symbol)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Coin);
