import React from "react";

import SortableListView from "react-native-sortable-listview";

import {
  AsyncStorage,
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import {
  Header
} from "react-navigation";

import {
  Icon
} from "react-native-elements";

import {
  Database
} from "./../services";

export default class RouteScreen extends React.Component {

  static navigationOptions = ({ navigation, navigationOptions, screenProps }) => ({
    header: (headerProps) => <Header title="Arrange Routes" { ...headerProps }/>
  });

  constructor(props) {
    super(props);

    this.state = {
      shuttle: null,
      stops: {
      },
      order: []
    };
  }

  setShuttle(ref) {
    if (ref.exists) {
      let shuttle = {
        id: ref.id,
        ...ref.data()
      };
      this.setState({
        shuttle
      });
      return shuttle
    }
  }

  setStops(shuttle) {
    shuttle.defaultRoute.get().then(doc => {
      doc.data().stops.forEach(ref => {
        ref.get().then(doc => {
          let { id } = doc;
          let { stops } = this.state;
          stops[id] = doc.data();
          this.setState({ stops, order: [...this.state.order, id] });
        });
      });
    })
  }

  async componentDidMount() {
    let shuttle = null;
    try {
      shuttle = await AsyncStorage.getItem("DRIVER_SHUTTLE");
    } catch {
    }
    Database.readData("shuttles", shuttle)
      .then(this.setShuttle.bind(this))
      .then(this.setStops.bind(this));
  }

  renderStop(stop) {
    if (stop == null) {
      return <View></View>
    }
    return (
      <TouchableOpacity
        style={ styles.stop }>
        <Icon style={ styles.stopIcon } name="reorder"/>
        <Text style={ styles.stopText } >{ stop.title }</Text>
      </TouchableOpacity>
    )
  }

  onRowMoved(e) {
    let { order } = this.state;
    order.splice(e.to, 0, order.splice(e.from, 1)[0]);
    this.setState({ order });
  }

  enterRoute() {
    let newRoute = {
      route: this.state.order.map(stop => Database.getDocumentReference("stops", stop))
    };
    Database.updateData("shuttles", this.state.shuttle.id, newRoute);
    this.props.navigation.navigate("driver");
  }

  render() {
    return (
      <View style={ styles.container }>
        <SortableListView
          style={ styles.route }
          data={ this.state.stops }
          order={ this.state.order }
          renderRow={ this.renderStop }
          onRowMoved={ this.onRowMoved.bind(this) }
          removeClippedSubviews={ false }/>
        <TouchableOpacity style={ styles.enter } onPress={ this.enterRoute.bind(this) }>
          <Text>Enter</Text>
        </TouchableOpacity>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
    flex: 1,
    paddingTop: Dimensions.get("window").height * 0.01,
  },
  route: {
    height: Dimensions.get("window").height * 0.8,
    width: (Dimensions.get("window").width - 20),
    marginHorizontal: 10
  },
  stop: {
    alignItems: "center",
    backgroundColor: "orange",
    flex: 1,
    flexDirection: "row",
    height: Dimensions.get("window").height * 0.1,
    justifyContent: "center",
    marginVertical: 5,
    margin: 0,
  },
  stopIcon: {
    paddingLeft: Dimensions.get("window").width * 0.05,
    width: Dimensions.get("window").width * 0.25
  },
  stopText: {
    fontSize: Dimensions.get("window").height * 0.02,
    textAlign: "center",
    width: Dimensions.get("window").width * 0.75
  },
  enter: {
    alignItems: "center",
    backgroundColor: "orange",
    borderColor: "green",
    borderWidth: 10,
    height: Dimensions.get("window").height * 0.1,
    margin: 0,
    justifyContent: "center",
    width: Dimensions.get("window").width
  }
});

/*
<SortableListView moveOnPressIn={ true } // taps respond quicker for sort
*/
