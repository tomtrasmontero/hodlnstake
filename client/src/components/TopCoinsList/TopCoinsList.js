import React, { Component } from 'react';
import { Grid, Segment, List, Label, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './TopCoinsList.scss';
import { numFormat } from '../../store/utility';
import ImageLoader from '../ImageLoader/ImageLoader';
import AreaChart from '../Chart/AreaChart/AreaChart';

class TopCoinsList extends Component {
  state = {
    columns: 8,
  }

  render() {
    const volume = '24h_volume_usd';
    const imageBaseUrl = 'https://chasing-coins.com/api/v1/std/logo/';

    const list = this.props.topCoins.map((coin) => {
      let statusIcon = <Icon name="arrow down" size="large" color="red" />;
      if (parseInt(coin.percent_change_7d, 10) > 0) {
        statusIcon = <Icon name="arrow up" size="large" color="green" />;
      }
      return (
        <Grid.Column
          tablet={16}
          computer={this.state.columns}
          key={coin.id}
        >
          <Segment raised className={classes.Coin} >
            <Label.Group className={classes.RibbonHeader}>
              <Link to={`/coins/detail/${coin.symbol}`}>
                <Label color="green" size="large" ribbon className={classes.Ribbon}>
                  {coin.rank}
                </Label>
                <Label size="large" attached="top" className={classes.Header}>
                  <Header textAlign="center">
                    <span className={classes.HeaderSpan}>
                      <ImageLoader imageurl={`${imageBaseUrl}${coin.symbol}`} avatar />
                      {coin.name}: {coin.symbol}
                    </span>
                  </Header>
                </Label>
              </Link>
            </Label.Group>

            <Grid stackable className={classes.Card}>
              <Grid.Column verticalAlign="middle" computer={5} tablet={5} mobile={16}>
                <List relaxed divided>
                  <List.Item>
                    <List.Content>
                      Price: ${numFormat((coin.price_usd * 1).toFixed(2))}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      Market Cap:
                      <br />$ {numFormat(parseInt(coin.market_cap_usd, 10).toFixed())}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      24H Change:
                      <br />{coin.percent_change_7d}% {statusIcon}
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      24H Volume:
                      <br />$ {numFormat(parseInt(coin[volume], 10).toFixed())}
                    </List.Content>
                  </List.Item>
                </List>
              </Grid.Column>

              <Grid.Column computer={11} tablet={11} mobile={16}>
                <AreaChart coin={coin.symbol} title="Price History" />
              </Grid.Column>

            </Grid>
          </Segment>
        </Grid.Column>
      );
    });
    return (
      <Grid stackable >
        {list}
      </Grid>
    );
  }
}

// PropTypes here
TopCoinsList.propTypes = {
  topCoins: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TopCoinsList;
