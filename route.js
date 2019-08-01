import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import MatchMaking from "./MatchMaking";
import ContactList from "./contactList";

const HomeScreenStack = createStackNavigator({
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
  }
});

export default createAppContainer(HomeScreenStack);
