import React from "react";

import {
  AsyncStorage,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import {
  Database
} from "./../services";

export default class ShuttleScreen extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      shuttles: []
    }
  }

  componentDidMount() {
    let foo = [];
    Database.readAllData("shuttles").then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        foo.push({ id: doc.id, ...doc.data() });
      });
      this.setState({
        shuttles: foo
      });
    });
  }

  selectShuttle(id) {
    return () => {
      AsyncStorage.setItem("DRIVER_SHUTTLE", id.toString());
      this.props.navigation.navigate("route");
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        {this.state.shuttles.map(shuttle => {
          return (
            <TouchableOpacity
              key={ shuttle.id }
              style={ styles.shuttle }
              onPress={ this.selectShuttle(shuttle.id).bind(this) }>
              <Text style={ styles.shuttleText }>🚌 { shuttle.title } </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
    height: Dimensions.get("window").height,
    paddingTop: Dimensions.get("window").height * 0.05,
    width: Dimensions.get("window").width,
    flex: 1,
    flexDirection: "column"
  },
  shuttle: {
    alignItems: "center",
    backgroundColor: "orange",
    borderColor: "green",
    borderWidth: 10,
    flex: 1,
    justifyContent: "center",
  },
  shuttleText: {
    fontSize: 30,
    paddingHorizontal: 10
  }
});
