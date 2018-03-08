import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Aux from '../../hoc/Aux/Aux';
import classes from './Search.scss';

// require value and clicked handler to get Data
// clickhandler (event , data)
class SearchCoins extends Component {
  state = {
    isLoading: false,
    value: '',
    result: [],
    placeholder: 'Search Coins',
  }

  componentDidMount() {
    this.props.getList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }

  resetComponent = () => this.setState({ isLoading: false, result: [], value: '' })

  handleOnFocus = (e) => {
    e.target.select();
    this.setState({ placeholder: '' });
  };

  handleOnBlur = () => {
    this.setState({ placeholder: 'Search Coins' });
  };

  handleResultSelect = (e, { result }) => this.setState({ value: result.symbol })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const match = this.props.list.filter((coin) => {
        // match name
        const matchName = coin.name.toUpperCase().includes(value.toUpperCase());

        return matchName;
      });

      // limit to 6 search result
      if (match.length > 6) {
        match.splice(6);
      }

      return this.setState({
        isLoading: false,
        result: match,
      });
    }, 500);
  }

  handleResultRenderer = ({ name }) => (
    <div>
      <span>
        {name}
      </span>
    </div>
  )

  render() {
    return (
      <Aux>
        <Search
          placeholder={this.state.placeholder}
          className={classes.SearchResult}
          fluid
          // make input field take 100% of container, pass an object fluid:true
          input={{ fluid: true, className: classes.SearchBox }}
          loading={this.state.isLoading}
          results={this.state.result}
          value={this.state.value}
          onResultSelect={this.props.clicked}
          onSearchChange={this.handleSearchChange}
          resultRenderer={this.handleResultRenderer}
          minCharacters={1}
          onFocus={this.handleOnFocus}
          onBlur={this.handleOnBlur}
          size="large"
          list={this.props.list}
        />
      </Aux>
    );
  }
}

SearchCoins.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  getList: PropTypes.func.isRequired,
  clicked: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};


const mapStateToProps = state => ({
  list: state.coin.coinSearchList,
});

const mapDispatchToProps = dispatch => ({
  getList: () => dispatch(actions.getCoinList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchCoins);
