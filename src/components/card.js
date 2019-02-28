import React from "react";

import PropTypes from "prop-types";

import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View
} from "react-native";

export default class Card extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      infoAnim: new Animated.Value(-(Dimensions.get("window").height * 0.25)),
      mounted: false,
      props: this.props
    }
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  handleSelf() {
    if (this.props.hidden) {
      this.hideSelf();
    }
    else {
      this.showSelf();
    }
  }

  showSelf() {
    if (this.state.mounted) {
      Animated.timing(
        this.state.infoAnim,
        {
          toValue: 0,
          duration: 100
        }
      ).start()
    }
  }

  hideSelf() {
    if (this.state.mounted) {
      Animated.timing(
        this.state.infoAnim,
        {
          toValue: -(Dimensions.get("window").height * 0.25),
          duration: 100
        }
      ).start()
    }
  }

  renderInner() {
  }

  getInfo() {
    return this.props.info;
  }

  render() {
    let { infoAnim } = this.state;
    this.handleSelf();

    return (
      <Animated.View
        style={[styles.container, { bottom: infoAnim }]}>
        { this.renderInner() }
      </Animated.View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 128, 0, 0.9)",
    borderRadius: 5,
    height: Dimensions.get("window").height * 0.2,
    marginHorizontal: Dimensions.get("window").width * 0.05,
    marginBottom: Dimensions.get("window").height * 0.05,
    position: "absolute",
    width: Dimensions.get("window").width * 0.9,
    zIndex: 10,
  }
});
