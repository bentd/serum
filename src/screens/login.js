import React from "react";

import {
  AsyncStorage,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from "react-native";

import {
  LinearGradient
} from "expo";

import {
  Users
} from "./../services";

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "email",
      password: "password",
      errorVisibility: 0
    }
  }

  async componentDidMount() {
    try {
      let login = await AsyncStorage.getItem("DRIVER_EMAIL");
      if (login !== null) {
        this.props.navigation.navigate("shuttle");
      }
    } catch (error) {
    }
  }

  attemptLogin() {
    //this._attemptLogin(Users.signIn(this.state.email, this.state.password));
    Users.signIn(this.state.email, this.state.password).then((successful) => {
      if (successful) {
        this.props.navigation.navigate("shuttle");
      }
      else {
        this.setState({
          errorVisibility: 1
        });
      }
    });
  }

  render() {
    return (
      <View style={ styles.container }>
        <LinearGradient
          colors={[ "orange", "darkorange" ]}
          style={ styles.gradient }>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height * 0.1
            }}>
            <Text
              style={{
                opacity: this.state.errorVisibility,
                color: "green",
                fontSize: 30
              }}>
              Account Not Found
            </Text>
          </View>
          <TextInput
            placeholder="Email"
            onChangeText={ (email) => {this.setState({ email })} }
            style={[ styles.input, styles.username ]} />
          <TextInput
            placeholder="Password"
            secureTextEntry={ true }
            onChangeText={ (password) => {this.setState({ password })} }
            style={ styles.input } />
          <TouchableHighlight
            style={ styles.button }
            underlayColor="darkorange"
            onPress={ this.attemptLogin.bind(this) } >
            <Text style={ styles.buttonText }>Login</Text>
          </TouchableHighlight>
        </LinearGradient>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    position: "relative"
  },
  gradient: {
    height: "100%",
    paddingTop: Dimensions.get("window").height * 0.1
  },
  input: {
    borderBottomColor: "orange",
    borderBottomWidth: 1,
    fontSize: 20,
    marginHorizontal: Dimensions.get("window").width * 0.05,
    paddingVertical: 25,
    width: Dimensions.get("window").width * 0.9
  },
  username: {
    marginTop: Dimensions.get("window").height * 0.1
  },
  button: {
    alignItems: "center",
    backgroundColor: "orange",
    borderRadius: 10,
    height: 55,
    justifyContent: "center",
    marginTop: 30,
    marginHorizontal: Dimensions.get("window").width * 0.1,
    width: Dimensions.get("window").width * 0.8
  },
  buttonText: {
    fontSize: 20
  },
})
