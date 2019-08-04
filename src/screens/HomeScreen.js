import React from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import CandidatesScreen from "./CandidatesScreen";
import MatchmakingScreen from "../../MatchMaking";
import {
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons
} from "react-native-vector-icons";
import SwitchSelector from "react-native-switch-selector";
import styles from "../styles/styles";
import { getCandidate } from "../actions/matchActions";
import { showProfileScreen } from "../actions/UserInfoActions";

export class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Basheret",
      headerStyle: {
        backgroundColor: "#f4f4f4",
        shadowColor: "transparent",
        borderBottomColor: "transparent",
        borderBottomWidth: 0
      },
      headerTintColor: "#00387e",
      headerTitleStyle: {
        fontWeight: "bold",
        fontFamily: "fitamint-script",
        fontSize: 30
      },
      headerLeft: (
        <Ionicons
          onPress={() => {
            navigation.navigate("Profile");
          }}
          name='ios-contact'
          size={32}
          color='grey'
          style={styles.headerIcons}
        />
      ),
      headerRight: (
        <Ionicons
          onPress={() => navigation.navigate("Social")}
          name='ios-chatbubbles'
          size={32}
          color='grey'
          style={styles.headerIcons}
        />
      )
    };
  };

  state = {
    show: "candidates"
  };

  componentDidMount() {
    this.props.dispatch(getCandidate());
  }

  render() {
    return <MatchmakingScreen />;
  }
}

const mapStateToProps = state => {
  return {
    location: state.userInfo.user.location
  };
};

export default connect(mapStateToProps)(HomeScreen);
