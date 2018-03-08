import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import logo from '../../assets/logoCoin.png';

class ImageLoader extends Component {
  state = {
    imageSrc: logo,
  }

  componentDidMount() {
    const newSrc = this.props.imageurl;
    this.setNewImage(newSrc);
  }

  setNewImage = (src) => {
    if (src) {
      this.setState({ imageSrc: src });
    }
  }

  render() {
    const errorSrc = () => {
      this.setNewImage(logo);
    };

    const image = (
      <Image
        src={this.state.imageSrc}
        onError={errorSrc}
        size={this.props.size}
        {...this.props}
      />
    );
    return (
      image
    );
  }
}

ImageLoader.propTypes = {
  imageurl: PropTypes.string,
  size: PropTypes.string,
};

ImageLoader.defaultProps = {
  imageurl: undefined,
  size: undefined,
};

export default ImageLoader;
