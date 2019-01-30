import React from "react";

import {
  Alert
} from "react-native";

import MapView, {
  Marker
} from "react-native-maps";


export default class Shuttle extends React.Component {
  constructor(props) {
    super(props);
  }

  showInformation() {
    let tta = 2;
    return Alert.alert(`Shuttle ${ this.props.id + 1 }`, `\nArriving In ${ tta } Min`);
  }

  render() {

    const heading = 0.0;
    const anchor = { x: 1, y: 1 };
    const image = require("./../assets/shuttle4.png");
    const coordinate = { latitude: 30.300051, longitude: -81.559001 };

    return (
      <Marker
        rotation={ heading }
        anchor={ anchor }
        image={ image }
        coordinate={ coordinate }
        onPress={ this.showInformation.bind(this) }
        />
    );
  }

}
