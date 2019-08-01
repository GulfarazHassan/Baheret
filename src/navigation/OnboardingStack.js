import { createStackNavigator } from "react-navigation";
import { fromRight } from "react-navigation-transitions";
import OnboardingScreen from "../screens/OnboardingScreen";
import LandingScreen from "../screens/LandingScreen";
import MatchMaking from "../../MatchMaking";
import ContactList from "../../contactList";
import MessageScreen from "../../MessageScreen";
import SendMessageScreen from "../../SendMessageScreen";

export default (OnboardingStack = createStackNavigator(
  {
    Landing: { screen: LandingScreen },
    OnboardingScreen: { screen: OnboardingScreen },
    MatchMaking: {
      screen: MatchMaking,
      navigationOptions: {
        header: null
      }
    },
    ContactList: {
      screen: ContactList,
      navigationOptions: {
        header: null
      }
    },
    MessageScreen: {
      screen: MessageScreen,
      navigationOptions: {
        header: null
      }
    },
    SendMessageScreen: {
      screen: SendMessageScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "Landing",
    transitionConfig: () => fromRight(1000)
  },
  {
    mode: "modal",
    headerMode: "none"
  }
));
