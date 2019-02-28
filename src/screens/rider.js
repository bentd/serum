import React from "react";

import {
  Dimensions,
  StyleSheet,
  View
} from "react-native";

import {
  MapView
} from "expo";

import {
  Database,
  Distance,
  MapStyle
} from "../services";

import {
  ShuttleView,
  ShuttleCard,
  StopView,
  StopCard
} from "../components";


export default class RiderScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      defaultRegion: {
        latitude: 30.426185,
        longitude: -84.287806,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      },
      mounted: false,
      shuttleCardHidden: true,
      stopCardHidden: true,
      region: false,
      listeners: [],
      stops: [],
      shuttles: [],
      selectedStop: 0,
      selectedShuttle: 0
    };
  }

  updateTimes(doc) {
    let { shuttles } = this.state;
    let { stops } = this.state;

    let shuttle = doc.data();
    shuttles[doc.id] = { id: doc.id, ...shuttle, nextStopTitle: stops[shuttle.nextStop.id].title };

    for (let _stop = 0; _stop < shuttle.route.length; _stop++) { // for every stop on the shuttle's route
      let stop = parseInt(shuttle.route[_stop].id);
      if (stop == shuttle.nextStop.id) { // if the stop is the next immediate stop compute the distance between the shuttle and the stop and update the shuttles arrival time and distance
        Distance.compute(shuttle.location, stops[stop].location).then(resp => {
          if (resp != null) {
            let duration = Distance.time(resp.duration.value);
            let distance = Distance.distance(resp.distance.value);
            shuttles[doc.id].arrivalTime = duration;
            shuttles[doc.id].arrivalDistance = distance;
            stops[stop].arrivalTime = duration;
            stops[stop].arrivalDistance = distance;
            this.setState({ shuttles, stops });
          }
        });
      }
      else { // if the stop is not the immediate next stop compute the distance including the points that have to be made prior
        let points = [];
        let point = ((_stop + 1) % shuttle.route.length);

        while (point != _stop) { // get all points prior to the stop
          if (point == _stop) break;
          points.push(point)
          point = ((point + 1) % shuttle.route.length);
        }

        let waypoints = points.map(point => stops[shuttle.route[point].id])

        Distance.total(shuttle.location, waypoints, stops[stop].location).then(legs => {
          if (legs != null) {
            let duration = 0;
            let distance = 0;
            for (let leg = 0; leg < legs.length; leg++) {
              distance += legs[leg].distance.value;
              duration += legs[leg].duration.value;
            }
            stops[stop].arrivalTime = Distance.time(duration);
            stops[stop].arrivalDistance = Distance.time(distance);
            this.setState({ stops });
          }
        });
      }
    }

    this.setState({ shuttles, stops });
  }

  setStops(docs) {
    let { stops } = this.state;
    docs.forEach((doc) => {
      stops[doc.id] = {
        id: doc.id,
        arrivalTime: "",
        arrivalDistance: "",
        ...doc.data()
      };
      this.setState({ stops });
    });
    this.setState({ stops });
  }

  setShuttles(docs) {
    let { shuttles } = this.state;
    let { listeners } = this.state;
    docs.forEach(doc => {
      let data = doc.data();
      shuttles[doc.id] = {
        id: doc.id,
        arrivalTime: "",
        arrivalDistance: "",
        nextStopTitle: this.state.stops[data.nextStop.id].title,
        ...data
      };
      listeners[doc.id] = Database.createDataListener("shuttles", doc.id, this.updateTimes.bind(this));
      this.setState({ shuttles, listeners });
    });
  }

  componentDidMount() {
    this.setState({ mounted: true });
    Database.readAllData("stops").then(this.setStops.bind(this));
    Database.readAllData("shuttles").then(this.setShuttles.bind(this));
  }

  toggleShuttleCard(id) {
    return () => {
      if (this.state.mounted) {
        this.setState({
          stopCardHidden: true
        });
        this.setState({
          shuttleCardHidden: !this.state.shuttleCardHidden
        });
        this.setState({
          selectedShuttle: id
        });
      }
    }
  }

  toggleStopCard(id) {
    return () => {
      if (this.state.mounted) {
        this.setState({
          shuttleCardHidden: true
        });
        this.setState({
          stopCardHidden: !this.state.stopCardHidden
        });
        this.setState({
          selectedStop: id
        });
      }
    }
  }

  hideCards() {
    if (this.state.mounted) {
      this.setState({
        shuttleCardHidden: true
      });
      this.setState({
        stopCardHidden: true
      });
    }
  }

  render() {
    const { stops } = this.state;
    const { defaultRegion } = this.state

    return (
      <View
        style={ styles.container }
        position="relative">

        <MapView
          style={ styles.mapview }
          provider={ MapView.PROVIDER_GOOGLE }
          initialRegion={ defaultRegion }
          showsUserLocation={ true }
          showsMyLocationButton={ this.state.shuttleCardHidden && this.state.stopCardHidden  }
          onLongPress={ this.hideCards.bind(this) }
          followsUserLocation={ true }
          showsScale={ true }
          customMapStyle={ MapStyle }
          position="relative" >
          {
            this.state.shuttles.map(shuttle => <ShuttleView key={ shuttle.id } location={ shuttle.location } onPress={ this.toggleShuttleCard(shuttle.id).bind(this) }/>)
          }
          {
            this.state.stops.map(stop => <StopView key={ stop.id } location={ stop.location } street={ stop.street } onPress={ this.toggleStopCard(stop.id).bind(this) } title={ stop.title }/>)
          }
        </MapView>
        <ShuttleCard info={ this.state.shuttles[this.state.selectedShuttle] } hidden={ this.state.shuttleCardHidden }/>
        <StopCard info={ this.state.stops[this.state.selectedStop] } hidden={ this.state.stopCardHidden }/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    position: "relative"
  },
  mapview: {
    height: Dimensions.get("window").height,
    position: "relative",
    zIndex: -1
  }
});
