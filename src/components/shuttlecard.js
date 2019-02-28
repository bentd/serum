import React from "react";

import Card from "./card.js";

import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";

export default class ShuttleCard extends Card {

  constructor(props) {
    super(props)
  }

  renderInner() {
    const shuttle = this.getInfo() ? this.getInfo() : { title: "", nextStopTitle: "", arrivalTime: "", arrivalDistance: ""};

    return (
      <View style={ styles.row }>
        <View style={ styles.column }>
          <Text style={ styles.title }>{ shuttle.nextStopTitle }</Text>
          <Text style={ styles.label }>{ shuttle.title }</Text>
        </View>
        <View style={ styles.column }>
          <Text style={ styles.time }>{ shuttle.arrivalTime }</Text>
          <Text style={ styles.distance }>{ shuttle.arrivalDistance }</Text>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 5
  },
  column: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  title: {
    fontSize: Dimensions.get("window").height * 0.035,
  },
  label: {
    fontSize: Dimensions.get("window").height * 0.020
  },
  time: {
    fontSize: Dimensions.get("window").height * 0.035
  },
  distance: {
    fontSize: Dimensions.get("window").height * 0.025
  }
})
