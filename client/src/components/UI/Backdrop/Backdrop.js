import React from 'react';
import PropTypes from 'prop-types';
import classes from './Backdrop.scss';

const backdrop = (props) => {
  const background = (
    <div
      className={classes.Backdrop}
      onClick={props.clicked}
      aria-hidden
    />
  );

  return props.visible ? background : null;
};

backdrop.propTypes = {
  show: PropTypes.bool,
  clicked: PropTypes.func.isRequired,
};

backdrop.defaultProps = {
  show: false,
};

export default backdrop;
