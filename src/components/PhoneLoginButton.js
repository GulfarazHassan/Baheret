import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, FontAwesome } from "react-native-vector-icons";

const PhoneLoginButton = ({ onPress }) => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={onPress} style={styles.phoneLoginButtonStyle}>
        <Text style={styles.loginButtonTextStyle}>Login with Phone</Text>
      </TouchableOpacity>
    </View>
  );
};

const PhoneLoginButton2 = ({ onPress }) => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={onPress} style={styles.phoneLoginButtonStyle2}>
        <Text style={styles.loginButtonTextStyle}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export { PhoneLoginButton };
export { PhoneLoginButton2 };

const styles = StyleSheet.create({
  loginButtonTextStyle: {
    color: "#fbfbfb",
    fontSize: 15
  },

  phoneLoginButtonStyle: {
    backgroundColor: "#d81159",
    padding: 20,
    alignItems: "center",
    alignSelf: "center",
    width: 300,
    borderRadius: 30
  },
  phoneLoginButtonStyle2: {
    backgroundColor: "#d81159",
    padding: 20,
    alignItems: "center",
    alignSelf: "center",
    width: 300,
    borderRadius: 30,
    marginTop: 10
  }
});
