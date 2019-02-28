import React from "react";

import {
  Alert,
  Text
} from "react-native";

import {
  MapView
} from "expo";

export default class StopView extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { location } = this.props;

    return (
      <MapView.Marker
        coordinate={ location }
        onPress={ this.props.onPress }>
        <Text style={{ fontSize: 40 }}>🚏</Text>
       </MapView.Marker>
    );
  }

}
