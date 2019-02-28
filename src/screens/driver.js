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
  Database,
  Distance,
  Users
} from "./../services";


export default class DriverScreen extends React.Component {

  constructor(props) {
    super(props);

    let timer = setInterval(this.update.bind(this), 1000);

    this.state = {
      location: null,
      shuttle: {
      },
      arrival: {
        distance: "",
        time: "",
      },
      shuttleActive: false,
      seconds: 0,
      time: "00:00:00",
      mounted: false,
      nextStop: 0,
      stops: [],
      timer,
      distance: ""
    };
  }

  setShuttle(ref) {
    let shuttle = {
      id: ref.id,
      ...ref.data()
    };
    this.setState({
      shuttle
    });
    return shuttle
  }

  setStops(shuttle) {
    shuttle.defaultRoute.get().then(doc => {
      doc.data().stops.forEach(ref => {
        ref.get().then(doc => {
          let { id } = doc;
          let { stops } = this.state;
          stops[id] = doc.data();
          this.setState({ stops });
        });
      });
    });
  }

  async componentDidMount() {
    this.setState({ mounted: true });
    let shuttle = null;
    try {
      shuttle = await AsyncStorage.getItem("DRIVER_SHUTTLE");
    } catch {
    }
    Database.readData("shuttles", shuttle)
      .then(this.setShuttle.bind(this))
      .then(this.setStops.bind(this));
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  start() {
    if (this.state.mounted) {
      this.setState({ shuttleActive: true });
    }
  }

  stop() {
    if (this.state.mounted) {
      this.setState({ shuttleActive: false });
    }
  }

  logout() {
    clearInterval(this.state.timer);
    Database.updateData("shuttles", this.state.shuttle.id, { active: false });
    Users.signOut();
    this.props.navigation.navigate("user");
  }

  updateTimer() {
    if (this.state.mounted) {
      let hours = (Math.floor(this.state.seconds / 3600)).toString().padStart(2, "0");
      let minutes = (Math.floor(this.state.seconds % 3600 / 60)).toString().padStart(2, "0");
      let seconds = (this.state.seconds % 60).toString().padStart(2, "0");
      let time = `${ hours }:${ minutes }:${ seconds }`;
      this.setState({ time });
    }
  }

  updateShuttleStatus() {
    if (this.state.mounted) {
      Database.updateData("shuttles", this.state.shuttle.id, { active: this.state.shuttleActive });
    }
  }

  updateArrival() {
    if (this.state.location !== null) {
      let stopLocation = {
        latitude: this.state.stops[this.state.nextStop].location.latitude,
        longitude: this.state.stops[this.state.nextStop].location.longitude,
      };
      Distance.compute(this.state.location, stopLocation).then(dist => {
        if (dist != null && dist.duration.text === "1 min") {
          this.setState({
            nextStop: (this.state.nextStop + 1) % this.state.stops.length
          });
        }
      });
      let newStops = {
        nextStop: Database.getDocumentReference("stops", this.state.nextStop.toString()),
      };
      Database.updateData("shuttles", this.state.shuttle.id, newStops);
    }
  }

  updateShuttleLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      let { latitude, longitude, heading } = position.coords;
      this.setState({location: { latitude, longitude }});
      Database.updateData("shuttles", this.state.shuttle.id, { location: this.state.location });
      this.updateArrival();
    });

  }

  updateNextStop() {
  }

  updateLaterStop() {
  }

  update() {
    if (this.state.mounted && this.state.shuttleActive) {
        this.setState({ seconds: this.state.seconds + 1 });
        this.updateShuttleLocation();
        this.updateArrival();
      }
      this.updateTimer();
      this.updateShuttleStatus();
  }

  render() {
    return (
      <View style={ styles.container }>
        <TouchableOpacity style={ styles.button } onPress={ this.start.bind(this) }>
          <Text style={ styles.buttonText }>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={ styles.button } onPress={ this.stop.bind(this) }>
          <Text style={ styles.buttonText }>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={ styles.button } onPress={ this.logout.bind(this) }>
          <Text style={ styles.buttonText }>Log Out</Text>
        </TouchableOpacity>
        <Text style={ styles.time }>{ this.state.time }</Text>
        <Text>{ this.state.distance }</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "green",
    height: Dimensions.get("window").height,
    paddingTop: Dimensions.get("window").height * 0.05,
  },
  button: {
    alignItems: "center",
    backgroundColor: "orange",
    height: Dimensions.get("window").height * 0.15,
    justifyContent: "center",
    marginHorizontal: Dimensions.get("window").width * 0.1,
    marginVertical: 10,
    width: Dimensions.get("window").width * 0.8
  },
  buttonText: {
    fontSize: Dimensions.get("window").height * 0.05,
    textAlign: "center"
  },
  time: {
    fontSize: Dimensions.get("window").height * 0.05,
    height: Dimensions.get("window").height * 0.1,
    marginHorizontal: Dimensions.get("window").width * 0.1,
    marginVertical: Dimensions.get("window").height * 0.05,
    textAlign: "center",
    width: Dimensions.get("window").width * 0.8
  }
});
