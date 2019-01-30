import React from "react";

import {
  Alert,
  StyleSheet,
  Text,
  View
} from "react-native";

import {
  Location,
  Permissions
} from "expo";

import MapView, {
  Marker
} from "react-native-maps";

import {
  Fab,
  Icon,
  Root
} from "native-base";

import {
  MapStyle
} from "./services";

import {
  Shuttle,
  Stop
} from "./components";


// FIXME: include navigation component here


var BUTTONS = ["Option 0", "Option 1", "Option 2", "Delete", "Cancel"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 30.300051,
        longitude: -81.559001,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      mounted: false,
    };

    Permissions.askAsync(Permissions.LOCATION);
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  updatePosition() {
    if ( this.state.mounted ) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.setState({
          region: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05
          }
        });
      });
    }
  }


  render() {

    const { region } = this.state;

    return (
      <Root style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>

        <MapView
          style={{ flex: 1, height: "100%", width: "100%", zIndex: -1 }}
          provider="google"
          region={ region }
          showsUserLocation={ true }
          showsScale={ true }
          customMapStyle={ MapStyle}
          >

          <Stop title="Cafe"/>

          <Shuttle id={ 0 }/>

        </MapView>

        <Fab
          active={ false }
          direction="up"
          containerStyle={{ }}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={ this.updatePosition.bind(this) }
          >

          <Icon name="ios-navigate" />

        </Fab>

      </View>
      </Root>
    );
  }
}

//const Fab = MKButton.plainFab();

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: '#fff',
alignItems: 'center',
justifyContent: 'center',
},
});
