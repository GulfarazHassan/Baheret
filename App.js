import React from "react";
import * as firebase from "firebase";
import {
  Image,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Button,
  Linking,
  StyleSheet,
  StatusBar,
  Platform
} from "react-native";
import * as Font from "expo-font";
import * as WebBrowser from "expo-web-browser";
import { Asset } from "react-native-unimodules";
// import { AppLoading } from "expo-app-loader-provider";
import { firebaseConfig } from "./config";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { fromRight } from "react-navigation-transitions";
import thunk from "redux-thunk";
import RootStack from "./src/navigation/RootStack.js";
import IntroQuestionsStack from "./src/navigation/IntroQuestionsStack";
import OnboardingStack from "./src/navigation/OnboardingStack";
import LoadingAppScreen from "./src/screens/LoadingAppScreen";
import reducers from "./src/reducers";
import { Root } from "native-base";
const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      LoadingApp: LoadingAppScreen,
      OnboardingStack: OnboardingStack,
      App: RootStack,
      IntroQuestions: IntroQuestionsStack
    },
    {
      initialRouteName: "LoadingApp",
      transitionConfig: () => fromRight(1000)
    }
  )
);

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class App extends React.Component {
  state = {
    isReady: false
  };

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([require("./assets/splash.png")]);

    const fontAssets = cacheFonts([
      {
        "fitamint-script": require("./assets/fonts/FitamintScript.ttf"),
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
      }
    ]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }

  render() {
    // if (!this.state.isReady) {
    //   return (
    //     // <AppLoading
    //     //   startAsync={this._loadAssetsAsync}
    //     //   onFinish={() => this.setState({ isReady: true })}
    //     //   onError={console.warn}
    //     // />
    //     <View style={styles.container}>{this._loadAssetsAsync}</View>
    //   );
    //   this.setState({ isReady: true });
    // }

    const store = createStore(reducers, applyMiddleware(thunk));

    return (
      <Provider store={store}>
        <Root>
          <AppContainer />
        </Root>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4F6D7A"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "#F5FCFF"
  },
  instructions: {
    textAlign: "center",
    color: "#F5FCFF",
    marginBottom: 5
  }
});
