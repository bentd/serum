import React from "react";

import {
  Alert,
  StyleSheet,
  Text,
  View
} from "react-native";

import {
  MapView
} from "expo";


export default class ShuttleView extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { location } = this.props;
    const { heading } = this.props;
    const transformation = {
      transform: [
        { rotateY: (heading > 180 ) ? "0deg": "180deg" }
      ]
    };
    
    return (
      <MapView.Marker
        coordinate={ location }
        anchor={{ x: 0.5, y: 0.5 }}
        flat={ false }
        onPress={ this.props.onPress }>
        <Text style={[ styles.shuttle, transformation ]}>🚌</Text>
       </MapView.Marker>
    );
  }

}

const styles = StyleSheet.create({
  shuttle: {
    fontSize: 30
  }
})
