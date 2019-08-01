import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import img from "./assets/profileicon.png";
import SwitchSelector from "react-native-switch-selector";
import img2 from "./assets/chaticon.png";
import plusIcon from "./assets/plus.png";
import MatchMaker from "./MatchMaker";
import MenPic from "./assets/men.jpg";
import Connect from "./Connect";
import { connect } from "react-redux";

class MatchMaking extends Component {
  showHeader = () => {
    return (
      <View style={styles.container2}>
        <TouchableOpacity
          onPress={() => {
            console.log("Image Button clicked ...");
          }}
          style={{
            marginRight: "auto",
            paddingTop: 30,
            paddingLeft: 10
          }}>
          <Image style={{ width: 30, height: 30 }} source={img} />
        </TouchableOpacity>
        <Text style={styles.headingText}> Basheret </Text>
        <TouchableOpacity
          onPress={() => {
            console.log("Image Button clicked ...");
          }}
          style={{ marginLeft: "auto", paddingTop: 30, paddingRight: 10 }}>
          <Image style={{ width: 30, height: 30 }} source={img2} />
        </TouchableOpacity>
      </View>
    );
  };

  showSelector = () => {
    return (
      <View style={styles.container3}>
        <View style={styles.container4}>
          <SwitchSelector
            initial={0}
            onPress={value => {
              this.props.showComponent({ show: value });
            }}
            textColor='rgb(3, 47, 128)'
            selectedColor='#ffffff'
            buttonColor='rgb(3, 47, 128)'
            backgroundColor='rgb(196, 196, 196)'
            hasPadding
            options={[
              { value: false, imageIcon: { img } }, //images.feminino = require('./path_to/assets/img/feminino.png')
              { value: true, imageIcon: { img } } //images.masculino = require('./path_to/assets/img/masculino.png')
            ]}
          />
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.userData.showHeader ? this.showHeader() : null}
        {this.props.userData.showHeader ? this.showSelector() : null}
        {this.props.userData.show ? <MatchMaker /> : <Connect />}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.contact
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showComponent: data => dispatch({ type: "SHOW_COMPONENT", payload: data })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchMaking);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(244, 244, 244)"
  },
  container2: {
    height: "15%",
    width: "100%",
    flexDirection: "row",
    marginTop: 20
  },
  headingText: {
    fontFamily: "FitamintScript",
    color: "rgb(3, 47, 128)",
    fontSize: 60
  },
  container3: {
    backgroundColor: "rgb(244, 244, 244)"
  },
  container4: {
    paddingLeft: 140,
    paddingRight: 140
  },
  matchmaker: {
    marginTop: 10,
    alignItems: "center"
  },
  matchmakerText: {
    fontFamily: "FitamintScript",
    color: "rgb(156, 0, 119)",
    fontSize: 60
  },
  matchContact: {
    flexDirection: "row",
    justifyContent: "center"
  },
  buttonContainer: {
    paddingLeft: 110,
    paddingRight: 120
  },
  home: {
    flex: 1,
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10
  }
});
