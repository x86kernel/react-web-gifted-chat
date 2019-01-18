/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  ViewPropTypes,
  Dimensions,
} from 'react-native';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TouchableOpacity from './TouchableOpacity';

export default class MessageImage extends React.Component {
  state = {
    isOpen: false,
  };

  onClickImage = () => {
    this.setState({ isOpen: true });
  }

  render() {
    const { isOpen } = this.state;
    return (
      <TouchableOpacity
        onPress={this.onClickImage}
        style={[styles.container, this.props.containerStyle]}
      >
        <Image
          {...this.props.imageProps}
          style={[styles.image, this.props.imageStyle]}
          source={{ uri: this.props.currentMessage.image }}
        />
        {isOpen && (
          <Lightbox
            mainSrc={this.props.currentMessage.image}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover',
  },
  imageActive: {
    flex: 1,
    resizeMode: 'contain',
  },
});

MessageImage.defaultProps = {
  currentMessage: {
    image: null,
  },
  containerStyle: {},
  imageStyle: {},
  imageProps: {},
  lightboxProps: {},
};

MessageImage.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  imageStyle: Image.propTypes.style,
  imageProps: PropTypes.object,
  lightboxProps: PropTypes.object,
};
