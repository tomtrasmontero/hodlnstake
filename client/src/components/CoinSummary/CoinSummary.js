import React, { Component } from 'react';
import { Container, Grid, Icon, Header, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import * as action from '../../store/actions/index';
import ImageLoader from '../../components/ImageLoader/ImageLoader';
import classes from './CoinSummary.scss';
import { numFormat } from '../../store/utility';

class CoinSummary extends Component {
  state = {
    currentData: '',
  }

  componentDidMount() {
    this.updateCurrentData((this.props.symbol));
  }

  shouldComponentUpdate(nextProps) {
    if (Object.keys(nextProps.coinData).length === 0) {
      return false;
    }
    return true;
  }

  componentWillUnmount() {
    this.props.clearCoinDetail();
  }

  updateCurrentData = async (symbol) => {
    // fixe cors issue
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const url = `https://chasing-coins.com/api/v1/std/coin/${symbol}`;
    const request = await axios.get(`${proxyurl}${url}`);
    this.setState({ currentData: request.data });
  }

  render() {
    const name = this.props.coinData.Name;
    let { Twitter, AffiliateUrl } = this.props.coinData;
    if (!Twitter) {
      Twitter = 'N/A';
    } else if (!AffiliateUrl) {
      AffiliateUrl = 'N/A';
    }

    const imageUrl = `https://chasing-coins.com/api/v1/std/logo/${this.props.symbol}`;
    const image = <ImageLoader imageurl={imageUrl} avatar />;
    let currentPrice = 0;
    let dayChange = 0;
    let hourChange = 0;
    if (this.state.currentData) {
      const { price, change: { day, hour } } = this.state.currentData;
      currentPrice = numFormat((price * 1).toFixed(2));
      dayChange = day;
      hourChange = hour;
    }

    return (
      <Container textAlign="center" className={classes.CoinSummary}>
        <Grid divided stretched stackable>
          <Grid.Row>
            <Grid.Column computer={3} tablet={16} verticalAlign="middle">
              <Grid.Row>
                <Header sub>
                  <a href={`https://twitter.com/${Twitter}`} target="_blank" >
                    <Icon name="twitter" fitted className={classes.Twitter} size="big" />
                    {Twitter}
                  </a>
                </Header>
              </Grid.Row>
              <Grid.Row>
                <Header sub>
                  <a href={AffiliateUrl} target="_blank">
                    {image}
                    {name}
                  </a>
                </Header>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column computer={13} tablet={16} >
              <List horizontal size="large" >
                <List.Item>
                  <List.Content>
                    <List.Header>Current Price</List.Header>
                    ${currentPrice}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header>24H Change</List.Header>
                    {dayChange}%
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header>Hour Change</List.Header>
                    {hourChange}%
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

CoinSummary.propTypes = {
  coinData: PropTypes.shape({
    Id: PropTypes.string,
    Twitter: PropTypes.string,
    Website: PropTypes.string,
    Name: PropTypes.string,
    AffiliateUrl: PropTypes.string,
  }).isRequired,
  clearCoinDetail: PropTypes.func.isRequired,
  symbol: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => ({
  clearCoinDetail: () => dispatch(action.clearCoinDetail()),
});

export default connect(null, mapDispatchToProps)(CoinSummary);
