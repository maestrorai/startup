import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Animated,
  ActivityIndicator
} from "react-native";

/*import {Actions} from 'react-native-router-flux'; */

import Logo from "../images/Logo.png";

/*const swichToAuth= ()=> {
    Actions.replace('auth')
}; */

class LoadingScene extends Component {
  state = {
    LogoAnime: new Animated.Value(0),
    LogoText: new Animated.Value(0),
    loadingSpinner: false
  };

  componentDidMount() {
    const { LogoAnime, LogoText } = this.state;
    Animated.parallel([
      Animated.spring(LogoAnime, {
        toValue: 1,
        tension: 10,
        friction: 2,
        duration: 1000,
        useNativeDriver: false
      }).start(),

      Animated.timing(LogoText, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false
      })
    ]).start(() => {
      this.setState({
        loadingSpinner: true
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            opacity: this.state.LogoAnime,
            top: this.state.LogoAnime.interpolate({
              inputRange: [0, 1],
              outputRange: [80, 0]
            })
          }}
        >
          <Image source={Logo} />
        </Animated.View>
        <Animated.View style={{ opacity: this.state.LogoText }}>
          <Text style={styles.logoText}>
            Your favourite foods delivered with drones
          </Text>
        </Animated.View>
      </View>
    );
  }
}

export default LoadingScene;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#AC79B9",
    justifyContent: "center",
    alignItems: "center"
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginVertical: -60,
    fontWeight: "200"
  }
});
