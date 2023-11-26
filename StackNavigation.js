import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native";
import { auth, logOut } from "./services/firebase";
import SavedScreen from "./screens/SavedScreen";
import DetailsScreen from "./screens/DetailsScreen";

const SavedStack = createStackNavigator();

const logout = async (navigation) => {
  await logOut();
  navigation.navigate("SignIn");
};

const SavedStackScreen = ({ navigation }) => (
  <SavedStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#957fef", // Set the header background color
      },
      headerTintColor: "#fff", // Set the text color in the header
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <SavedStack.Screen
      name="Saved"
      component={SavedScreen}
      options={{
        title: "Saved Activities", // Set the title in the header
        headerRight: () => (
          <Button
            onPress={() => logout(navigation)}
            title="Log Out"
            color={"#fff"}
            // color="#fff"
          />
        ),
        headerLeft: null,
      }}
    />
    {/* <SavedStack.Screen name="Details" component={DetailsScreen} /> */}
  </SavedStack.Navigator>
);

export default SavedStackScreen;
