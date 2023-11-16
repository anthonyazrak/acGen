import { auth, logOut } from "./services/firebase";

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native"; // Make sure Button is imported
import SavedScreen from "./screens/SavedScreen";
import DetailsScreen from "./screens/DetailsScreen";

const SavedStack = createStackNavigator();

const logout = async (navigation) => {
  // Implement your logout logic here
  // This might include clearing user data from storage and navigating to the sign-in screen
  await logOut(); // Call the logout function to sign the user out
  navigation.navigate("SignIn");
};

const SavedStackScreen = ({ navigation }) => (
  <SavedStack.Navigator>
    <SavedStack.Screen
      name="Saved"
      component={SavedScreen}
      options={{
        headerRight: () => (
          <Button
            onPress={() => logout(navigation)}
            title="Log Out"
            color="#000"
          />
        ),
        headerLeft: null, // To hide the back button if it exists
      }}
    />
    {/* <SavedStack.Screen name="Details" component={DetailsScreen} /> */}
  </SavedStack.Navigator>
);

export default SavedStackScreen;
