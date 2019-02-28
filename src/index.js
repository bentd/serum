import React from "react";

import {
  createAppContainer,
  createStackNavigator,
} from "react-navigation";

import {
  UserScreen,
  LoginScreen,
  ShuttleScreen,
  RouteScreen,
  DriverScreen,
  RiderScreen
} from "./screens";

import {
  Database
} from "./services";

const AppNavigator = createStackNavigator(
  {
    user: UserScreen,
    login: LoginScreen,
    shuttle: ShuttleScreen,
    route: {
      screen: RouteScreen,
      navigationOptions: {
        title: "Arrange Route",
        headerStyle: {
          backgroundColor: "green",
          borderBottomColor: "green"
        },
        headerTintColor: "black",
        headerLeft: null
      }
    },
    driver: DriverScreen,
    rider: RiderScreen
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false,
      header: null,
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {

  constructor(props) {
    super(props);

    let database = new Database();

  }

  render() {
    return <AppContainer/>;
  }

}
