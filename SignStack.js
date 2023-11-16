import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "./path-to-your/SignInScreen"; // Update the path as necessary
import MainTabNavigator from "./StackNavigation"; // Assuming StackNavigation.js exports the tab navigator

const Stack = createStackNavigator();

function SignStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      {/* <Stack.Screen name="MainTabs" component={MainTabNavigator} /> */}
    </Stack.Navigator>
  );
}

export default SignStack;
