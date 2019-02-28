import React from "react";

import PropTypes from "prop-types";

import Card from "./card.js";

import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View
} from "react-native";



export default class StopCard extends Card {

  constructor(props) {
    super(props)
  }

  renderInner() {
    const stop = this.getInfo() ? this.getInfo() : { title: "", street: "", arrivalTime: "", arrivalDistance: "" };

    return (
      <View style={ styles.row }>
        <View style={ styles.column }>
          <Text style={ styles.title }>{ stop.title }</Text>
          <Text style={ styles.street }>{ stop.street }</Text>
        </View>
        <View style={ styles.column }>
          <Text style={ styles.time }>{ stop.arrivalTime }</Text>
          <Text style={ styles.distance }>{ stop.arrivalDistance }</Text>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row"
  },
  column: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  title: {
    fontSize: Dimensions.get("window").height * 0.035
  },
  street: {
    fontSize: Dimensions.get("window").height * 0.025
  },
  time: {
    fontSize: Dimensions.get("window").height * 0.035
  },
  distance: {
    fontSize: Dimensions.get("window").height * 0.025
  }
});
