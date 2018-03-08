import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Segment, Grid, Responsive, Statistic, Divider, Header, Icon } from 'semantic-ui-react';
import * as actions from '../../../store/actions/index';
import SearchCoins from '../../Search/Search';
import classes from './CoinExplorer.scss';
import Aux from '../../../hoc/Aux/Aux';
import AreaChart from '../../../components/Chart/AreaChart/AreaChart';

class CoinExplorer extends Component {
  state = {
    value: '',
  }

  componentWillUnmount() {
    this.props.clearCoinSummary();
  }

  clickedHandler = (event, data) => {
    const newValue = data.result.symbol;
    this.props.getCoinSummary(newValue);
    this.setState({ value: newValue });
  }

  render() {
    const { OPEN24HOUR, HIGH24HOUR, LOW24HOUR } = this.props.coinSummary;
    let summary = null;

    if (Object.keys(this.props.coinSummary).length > 0) {
      summary = (
        <Aux>
          <Grid.Row>
            <Statistic.Group as={Grid} container columns={3} size="mini" >

              <Grid.Column mobile={4} verticalAlign="middle" textAlign="center" >
                <Link to={`/coins/detail/${this.props.coinSummary.symbol}`} >
                  <Icon.Group size="huge">
                    <Icon name="file text outline" />
                    <Icon corner name="info" />
                  </Icon.Group>
                </Link>
              </Grid.Column>

              <Grid.Column mobile={12}>
                <Statistic>
                  <Statistic.Value text >
                    {OPEN24HOUR}
                    <Header color="grey" sub>Open</Header>
                  </Statistic.Value>
                </Statistic>
                <Statistic>
                  <Statistic.Value text >
                    {HIGH24HOUR}
                    <Header color="grey" sub>High</Header>
                  </Statistic.Value>
                </Statistic>
                <Statistic>
                  <Statistic.Value text >
                    {LOW24HOUR}
                    <Header color="grey" sub>Low</Header>
                  </Statistic.Value>
                </Statistic>
              </Grid.Column>

            </Statistic.Group>
          </Grid.Row>
          <br />
          <Divider clearing />
          <Grid.Row>
            <AreaChart coin={this.state.value} title={`${this.state.value} Price History`} />
          </Grid.Row>

        </Aux>
      );
    }


    return (
      <Segment
        as={Grid}
        divided
        columns={2}
        stackable
        className={classes.CoinExplorer}
      >
        <Grid.Row centered>
          <Grid.Column mobile={16} computer={5} >
            <SearchCoins
              clicked={this.clickedHandler}
              value={this.state.value}
            />
            <br />
          </Grid.Column>
          <Responsive as={Grid.Column} mobile={16} computer={11} >
            {summary}
          </Responsive>
        </Grid.Row>
      </Segment>
    );
  }
}

CoinExplorer.propTypes = {
  getCoinSummary: PropTypes.func.isRequired,
  coinSummary: PropTypes.shape({
    OPEN24HOUR: PropTypes.string,
    HIGH24HOUR: PropTypes.string,
    LOW24HOUR: PropTypes.string,
    symbol: PropTypes.string,
  }).isRequired,
  clearCoinSummary: PropTypes.func.isRequired,
};

CoinExplorer.defaultProp = {
  coinSummary: PropTypes.shape({
    OPEN24HOUR: 0,
    HIGH24HOUR: 0,
    LOW24HOUR: 0,
  }),
};

const mapStateToProps = state => ({
  coinSummary: state.coin.coinSnapShot,
});

const mapDispatchToProps = dispatch => ({
  getCoinSummary: symbol => dispatch(actions.getCoinSnapShot(symbol)),
  clearCoinSummary: () => dispatch(actions.clearCoinSummary()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoinExplorer);
