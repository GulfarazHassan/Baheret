import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
import { Ionicons } from "react-native-vector-icons";
import { updateUserInfo } from "../actions/UserInfoActions";
import { UnderlinedInput } from "../components/UnderlinedInput";
import { Header } from "react-navigation";
import { NextButton } from "../components/NextButton";

export class EditHometownScreen extends React.Component {
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
      headerRight: null,
      headerLeft: null
    };
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F4F4F4",
          justifyContent: "center"
        }}>
        <View style={{ flex: 1, fontSize: 25, fontWeight: "bold" }}>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>
            Edit your Hometown:
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <UnderlinedInput
            onChangeText={text =>
              this.props.dispatch(updateUserInfo("info", "hometown", text))
            }
            defaultValue={this.props.hometown}
          />
        </View>

        <View style={{ flex: 1 }}>
          <NextButton onPress={() => this.props.navigation.navigate("Profile")}>
            <Text>Done</Text>
          </NextButton>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    hometown: state.userInfo.user.info.hometown
  };
};

export default connect(mapStateToProps)(EditHometownScreen);
