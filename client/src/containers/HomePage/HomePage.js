import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Header, Divider, Responsive, Loader } from 'semantic-ui-react';
import classes from './HomePage.scss';
import * as actions from '../../store/actions/index';
import CurrentNews from '../../components/News/News';
import GlobalMarketSummary from '../../components/GlobalMarketSummary/GlobalMarketSummary';
import Aux from '../../hoc/Aux/Aux';

class HomePage extends Component {
  componentDidMount() {
    this.props.getHeadline();
    this.props.getGlobalData();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.currentTopTenNews.length === 0) {
      return false;
    }
    if (Object.keys(nextProps.globalMarketData).length === 0) {
      return false;
    }
    return true;
  }

  render() {
    let news = <Loader active />;
    if (this.props.currentTopTenNews.length > 0) {
      news = <CurrentNews currentTopTenNews={this.props.currentTopTenNews} />;
    }
    return (
      <Aux>
        <Container fluid>
          <Responsive
            as={GlobalMarketSummary}
            data={this.props.globalMarketData}
            minWidth={768}
          />
        </Container>
        <div className={classes.NewsHeader}>
          <Header as="h1" textAlign="center" inverted color="grey">Current News</Header>
        </div>
        <Divider className={classes.Divider} />
        <br />
        <Container fluid className={classes.HomePage}>
          { news }
        </Container>
      </Aux>
    );
  }
}

// PropTypes
HomePage.propTypes = {
  getHeadline: PropTypes.func.isRequired,
  currentTopTenNews: PropTypes.arrayOf(PropTypes.object).isRequired,
  getGlobalData: PropTypes.func.isRequired,
  globalMarketData: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({
  currentTopTenNews: state.news.topTenNews,
  globalMarketData: state.coin.globalMarketData,
});

const mapDispatchToProps = dispatch => ({
  getHeadline: () => dispatch(actions.getTopHeadlines()),
  getGlobalData: () => dispatch(actions.getGlobalMarketData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
