import React from "react";

import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from "react-native";

export default class UserScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={ styles.container }>
          <TouchableHighlight
            onPress={ () => { this.props.navigation.push("login") } }
            style={[ styles.button, styles.driver ]}
            underlayColor="green" >
            <Text style={ styles.text }>Driver</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={ () => { this.props.navigation.navigate("rider") } }
            style={[ styles.button, styles.rider ]}
            underlayColor="orange" >
            <Text style={ styles.text }>Rider</Text>
          </TouchableHighlight>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    position: "relative",
    width: Dimensions.get("window").width
  },
  button: {
    alignItems: "center",
    height: Dimensions.get("window").height * 0.50,
    marginVertical: 0,
    justifyContent: "center",
    position: "relative",
  },
  text: {
    fontSize: 30,
  },
  driver: {
    backgroundColor: "orange",
  },
  rider: {
    backgroundColor: "green",
  }
});
