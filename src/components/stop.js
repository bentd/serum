import React from "react";

import {
  Alert
} from "react-native";

import MapView, {
  Marker
} from "react-native-maps";


export default class Stop extends React.Component {
  constructor(props) {
    super(props);
  }

  showInformation() {
    const tta = 5;
    Alert.alert(`${ this.props.title }`, `\nNext Shuttle Arriving In ${ tta } Min`);
  }

  render() {
    const coordinate = { latitude: 30.300051, longitude: -81.558922 }

    return (
      <Marker
        coordinate={ coordinate }
        pinColor="green"
        onPress={ this.showInformation.bind(this)  }
        />
    );
  }

}
